"use server";

import { Quizset } from "@/model/quizset-model";
import { dbConnect } from "@/service/mongo";

export async function updateQuizSet(quizSetId, dataToUpdate) {
  await dbConnect();
  try {
    await Quizset.findByIdAndUpdate(quizSetId, dataToUpdate);
  } catch (error) {
    throw new Error(error);
  }
}
