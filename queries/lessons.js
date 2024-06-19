import { Lesson } from "@/model/lesson-model";
import { dbConnect } from "@/service/mongo";

export async function getLesson(lessonId) {
  await dbConnect();
  const lesson = await Lesson.findById(lessonId).lean();
  return lesson;
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

