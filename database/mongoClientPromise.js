import { MongoClient } from "mongodb";

var _mongomongoClientPromise;

if (!process.env.MONGODB_CONNECTION_STRING) {
  throw new Error(
    'Invalid/Missing environment variable: "MONGODB_CONNECTION_STRING"'
  );
}

const uri = process.env.MONGODB_CONNECTION_STRING;
const options = {};

let client;
let mongoClientPromise;

if (process.env.ENVIRONMENT === "lwskart") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongomongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongomongoClientPromise = client.connect();
  }
  mongoClientPromise = global._mongomongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  mongoClientPromise = client.connect();
}

export default mongoClientPromise;
