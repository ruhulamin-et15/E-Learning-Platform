import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";
import { dbConnect } from "@/service/mongo";

export async function getAllQuizSets() {
  await dbConnect();
  try {
    const quizSets = await Quizset.find().lean();
    return replaceMongoIdInArray(quizSets);
  } catch (error) {
    throw new Error(error);
  }
}

export async function getQuizSetById(id) {
  await dbConnect();
  try {
    const quizSet = await Quizset.findById(id)
      .populate({
        path: "quizIds",
        model: Quiz,
      })
      .lean();
    return quizSet;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getQuizById(id) {
  await dbConnect();
  try {
    const quiz = await Quiz.findById(id).lean();
    return replaceMongoIdInObject(quiz);
  } catch (error) {
    throw new Error(error);
  }
}

export async function createQuiz(quizData) {
  try {
    const quiz = await Quiz.create(quizData);
    return quiz._id.toString();
  } catch (error) {
    throw new Error(error);
  }
}
