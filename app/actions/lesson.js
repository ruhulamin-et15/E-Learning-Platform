/* eslint-disable no-undef */
"use server";

import { Lesson } from "@/model/lesson-model";
import { Module } from "@/model/module-model";
import { create } from "@/queries/lessons";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";

export async function createLesson(data) {
  await dbConnect();
  try {
    const title = data.get("title");
    const slug = data.get("slug");
    const moduleId = data.get("moduleId");
    const order = data.get("order");

    const createdLesson = await create({
      title,
      slug,
      moduleId,
      order,
    });

    const modules = await Module.findById(moduleId);
    modules.lessonIds.push(createdLesson._id);
    modules.save();
    return createdLesson;
  } catch (error) {
    throw new Error(error);
  }
}

export async function reOrderLessons(data) {
  await dbConnect();
  try {
    await Promise.all(
      data.map(async (element) => {
        await Lesson.findByIdAndUpdate(element.id, { order: element.position });
      })
    );
  } catch (error) {
    throw new Error();
  }
}

export async function updateLesson(lessonId, data) {
  await dbConnect();
  try {
    await Lesson.findByIdAndUpdate(lessonId, data);
  } catch (error) {
    throw new Error();
  }
}

export async function changeLessonPublishState(lessonId) {
  await dbConnect();
  try {
    const lesson = await Lesson.findById(lessonId);
    const res = await Lesson.findByIdAndUpdate(
      lessonId,
      { published: !lesson.published },
      { lean: true }
    );
    return res.published;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteLesson(lessonId, moduleId) {
  await dbConnect();
  try {
    const thisModule = await Module.findById(moduleId);
    thisModule.lessonIds.pull(new mongoose.Types.ObjectId(lessonId));
    await Lesson.findByIdAndDelete(lessonId);
    thisModule.save();
  } catch (error) {
    throw new Error(error);
  }
}
