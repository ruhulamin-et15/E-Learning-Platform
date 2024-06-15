"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";
import { dbConnect } from "@/service/mongo";

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
