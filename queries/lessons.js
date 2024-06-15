import { Lesson } from "@/model/lesson-model";
import { replaceMongoIdInObject } from "@/lib/convertData";
import { dbConnect } from "@/service/mongo";

export async function getLesson(lessonId) {
  await dbConnect();
  const lesson = await Lesson.findById(lessonId).lean();
  return replaceMongoIdInObject(lesson);
}

export async function create(lessonId) {
  await dbConnect();
  try {
    const lesson = await Lesson.create(lessonId);
    return JSON.parse(JSON.stringify(lesson));
  } catch (error) {
    throw new Error(error);
  }
}

