import { User } from "@/model/user-model";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { firstName, lastName, email, password, userRole } =
    await request.json();
  await dbConnect();
  const existEmail = await User.findOne({ email: email });
  if (existEmail) {
    return new NextResponse(`${email} already exist`, {
      status: 403,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: userRole,
  };

  try {
    await User.create(newUser);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};

