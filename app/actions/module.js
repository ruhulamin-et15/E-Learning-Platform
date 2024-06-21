/* eslint-disable no-undef */
"use server";

import { create } from "@/queries/modules";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module-model";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";

export async function createModule(data) {
  await dbConnect();
  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const courseId = data.get("courseId");
    const order = data.get("order");

    const createdModule = await create({
      title,
      slug,
      course: courseId,
      order,
    });

    const course = await Course.findById(courseId);
    course.modules.push(createdModule._id);
    course.save();
    return createdModule;
  } catch (error) {
    throw new Error(error);
  }
}

export async function reOrderModules(data) {
  await dbConnect();
  try {
    await Promise.all(
      data.map(async (element) => {
        await Module.findByIdAndUpdate(element.id, { order: element.position });
      })
    );
  } catch (error) {
    throw new Error();
  }
}

export async function updateModule(moduleId, data) {
  await dbConnect();
  try {
    await Module.findByIdAndUpdate(moduleId, data);
  } catch (error) {
    throw new Error();
  }
}

export async function changeModulePublishState(moduleId) {
  await dbConnect();
  try {
    const thisModule = await Module.findById(moduleId);
    const res = await Module.findByIdAndUpdate(
      moduleId,
      { active: !thisModule?.active },
      { lean: true }
    );
    return res.active;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteModule(moduleId, courseId) {
  await dbConnect();
  try {
    const course = await Course.findById(courseId);
    course.modules.pull(new mongoose.Types.ObjectId(moduleId));
    await Module.findByIdAndDelete(moduleId);
    course.save();
  } catch (error) {
    throw new Error(error);
  }
}
