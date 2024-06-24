import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "./model/user-model";
import mongoClientPromise from "./database/mongoClientPromise";
import { dbConnect } from "./service/mongo";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

async function refreshAccessToken(token) {
  try {
    if (token.refreshToken) {
      const decoded = jwt.verify(
        token.refreshToken,
        process.env.JWT_REFRESH_SECRET
      );
      const user = await User.findById(decoded.userId);

      if (!user) {
        throw new Error("User not found");
      }

      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return {
        ...token,
        accessToken,
        accessTokenExpires: Date.now() + 3600 * 1000,
        refreshToken: token.refreshToken,
      };
    }

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/account",
    signOut: "/login",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log(`jwt token: ${JSON.stringify(token)}`);
      console.log(`jwt account: ${JSON.stringify(account)}`);
      if (account && user) {
        token.accessToken = account?.access_token;
        token.refreshToken = account?.refresh_token;
        token.accessTokenExpires = account?.expires_at * 1000;
        token.user = user;
      }

      console.log(`token expired at ${new Date(token.accessTokenExpires)}`);

      if (user && user.refreshToken) {
        token.refreshToken = user.refreshToken;
      }

      if (Date.now() < token.accessTokenExpires) {
        console.log(`At ${new Date(Date.now())}, Using old token`);
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token?.user;
      session.accessToken = token?.access_token;
      session.error = token.error;

      console.log(`Returning session ${JSON.stringify(session)}`);
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        await dbConnect();
        try {
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("User not found");
          }

          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isMatch) {
            throw new Error("Email or password mismatch");
          }

          const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "1d" }
          );

          user.refreshToken = refreshToken;
          await user.save();

          return { ...user.toObject(), refreshToken };
        } catch (error) {
          throw new Error(error);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
    }),
  ],
});

// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { User } from "./model/user-model";
// import bcrypt from "bcryptjs";

// async function refreshAccessToken(token) {
//   try {
//     const url =
//       "https://oauth2.googleapis.com/token?" +
//       new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET_ID,
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       });

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens?.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens?.expires_in * 1000,
//       refreshToken: refreshedTokens?.refresh_token,
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// export const {
//   auth,
//   signIn,
//   signOut,
//   handlers: { GET, POST },
// } = NextAuth({
//   ...authConfig,
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         if (credentials == null) return null;

//         try {
//           const user = await User.findOne({
//             email: credentials?.email,
//           });
//           console.log(user);

//           if (user) {
//             const isMatch = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );

//             if (isMatch) {
//               return user;
//             } else {
//               console.error("password mismatch");
//               throw new Error("Check your password");
//             }
//           } else {
//             console.error("User not found");
//             throw new Error("User not found");
//           }
//         } catch (err) {
//           console.error(err);
//           throw new Error(err);
//         }
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user, account }) {
//       console.log(`JWT token: ${JSON.stringify(token)}`);
//       console.log(`JWT Account: ${JSON.stringify(account)}`);

//       if (account && user) {
//         return {
//           accessToken: account?.access_token,
//           accessTokenExpires: Date.now() + account?.expires_in * 1000,
//           refreshToken: account?.refresh_token,
//           user,
//         };
//       }

//       console.log(
//         `Token Will Expire at ${new Date(token.accessTokenExpires)})`
//       );

//       if (Date.now() < token?.accessTokenExpires) {
//         console.log(`At ${new Date(Date.now())}, Using old access token`);
//         return token;
//       }

//       console.log(`Token Expired at ${new Date(Date.now())}`);
//       return refreshAccessToken(token);
//     },

//     async session({ session, token }) {
//       session.user = token?.user;
//       session.accessToken = token?.access_token;
//       session.error = token?.error;

//       console.log(`Returning Session ${JSON.stringify(session)}`);
//       return session;
//     },
//   },
// });

