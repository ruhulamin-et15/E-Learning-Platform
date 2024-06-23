"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";

export async function createCourse(data) {
  await dbConnect();
  try {
    const loggedinUser = await getLoggedInUser();
    data["instructor"] = loggedinUser?._id;
    const course = await create(data);
    return course;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateCourse(courseId, dataToUpdate) {
  await dbConnect();
  try {
    await Course.findByIdAndUpdate(courseId, dataToUpdate);
  } catch (error) {
    throw new Error(error);
  }
}

export async function changeCourseState(courseId) {
  await dbConnect();
  try {
    const course = await Course.findById(courseId);
    const res = await Course.findByIdAndUpdate(
      courseId,
      { active: !course.active },
      { lean: true }
    );
    return res.active;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteCourse(courseId) {
  await dbConnect();
  try {
    await Course.findByIdAndDelete(courseId);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateQuizSetId(courseId, dataToUpdate) {
  await dbConnect();
  try {
    const data = {};
    data["quizSet"] = new mongoose.Types.ObjectId(dataToUpdate.quizSetId);
    await Course.findByIdAndUpdate(courseId, data);
  } catch (error) {
    throw new Error(error);
  }
}

// export async function updateLearningItems(courseId, dataToUpdate) {
//   await dbConnect();
//   try {
//     const data = { learning: dataToUpdate.learning };
//     await Course.findByIdAndUpdate(courseId, data, { new: true });
//   } catch (error) {
//     throw new Error(error);
//   }
// }
