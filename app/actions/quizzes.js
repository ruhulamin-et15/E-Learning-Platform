"use server";

import { Quizset } from "@/model/quizset-model";
import { dbConnect } from "@/service/mongo";

export async function updateQuizSet(quizSetId, data) {
  await dbConnect();
  try {
    await Quizset.findByIdAndUpdate(quizSetId, data);
  } catch (error) {
    throw new Error(error);
  }
}
