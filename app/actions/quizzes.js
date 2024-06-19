"use server";

import { getSlug } from "@/lib/convertData";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";
import { createQuiz } from "@/queries/quizzes";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";

export async function updateQuizSet(quizSetId, dataToUpdate) {
  await dbConnect();
  try {
    await Quizset.findByIdAndUpdate(quizSetId, dataToUpdate);
  } catch (error) {
    throw new Error(error);
  }
}

export async function addQuizToQuizSet(quizSetId, quizData) {
  await dbConnect();
  try {
    const transformedQuizData = {};

    transformedQuizData["question"] = quizData["title"];
    transformedQuizData["description"] = quizData["description"];
    transformedQuizData["slug"] = getSlug(quizData["description"]);
    transformedQuizData["options"] = [
      { text: quizData.optionA.label, is_correct: quizData.optionA.isTrue },
      { text: quizData.optionB.label, is_correct: quizData.optionB.isTrue },
      { text: quizData.optionC.label, is_correct: quizData.optionC.isTrue },
      { text: quizData.optionD.label, is_correct: quizData.optionD.isTrue },
    ];

    const createdQuizId = await createQuiz(transformedQuizData);
    const quizSet = await Quizset.findById(quizSetId);

    quizSet.quizIds.push(createdQuizId);
    quizSet.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteQuiz(quizId, quizSetId) {
  await dbConnect();
  try {
    const quizSet = await Quizset.findById(quizSetId);
    quizSet.quizIds.pull(new mongoose.Types.ObjectId(quizId));
    await Quiz.findByIdAndDelete(quizId);
    quizSet.save();
  } catch (error) {
    throw new Error(error);
  }
}

export async function editQuiz(quizId, dataToUpdate) {
  await dbConnect();
  try {
    await Quiz.findByIdAndUpdate(quizId, dataToUpdate);
  } catch (error) {
    throw new Error(error);
  }
}

export async function changeQuizSetPublishState(quizSetId) {
  await dbConnect();
  try {
    const quizSet = await Quizset.findById(quizSetId);
    const res = await Quizset.findByIdAndUpdate(
      quizSetId,
      { active: !quizSet.active },
      { lean: true }
    );
    return res.active;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteQuizSet(quizSetId) {
  await dbConnect();
  try {
    await Quizset.findByIdAndDelete(quizSetId);
  } catch (error) {
    throw new Error(error);
  }
}

export async function doCreateQuizSet(data) {
  await dbConnect();
  try {
    data["slug"] = getSlug(data.title);
    const createdQuizSet = await Quizset.create(data);
    return createdQuizSet?._id.toString();
  } catch (error) {
    throw new Error(error);
  }
}
