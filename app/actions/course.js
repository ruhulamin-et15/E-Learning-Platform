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

export async function changeCourseState(courseId) {
  await dbConnect();
  try {
    const course = await Course.findById(courseId);
    console.log(course);
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
