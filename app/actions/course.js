"use server";

import { getLoggedInUser } from "@/lib/loggedin-user";
import { Course } from "@/model/course-model";
import { create } from "@/queries/courses";

export async function createCourse(data) {
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
  try {
    await Course.findByIdAndUpdate(courseId, dataToUpdate);
  } catch (error) {
    throw new Error(error);
  }
}
