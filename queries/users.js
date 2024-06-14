import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email) {
  const user = await User.findOne({ email: email }).lean();
  return user;
}

export async function getUserById(userId) {
  const user = await User.findById(userId).lean();
  return user;
}

export async function validatePassword(email, password) {
  const user = await getUserByEmail(email);
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
}

