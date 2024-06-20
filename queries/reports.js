import { Assessment } from "@/model/assessment-model";
import { Module } from "@/model/module-model";
import { Report } from "@/model/report-model";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { getCourseDetails } from "./courses";

export async function getReport(filter) {
  await dbConnect();
  try {
    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        ref: Assessment,
      })
      .lean();
    if (!report) {
      console.log("No report found with the given filter:", filter);
      return null;
    }
    return report;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createWatchReport(data) {
  try {
    let report = await Report.findOne({
      course: data.courseId,
      student: data.userId,
    });
    if (!report) {
      report = await Report.create({
        course: data.courseId,
        student: data.userId,
      });
    }

    const foundLesson = report.totalCompletedLessons.find(
      (lessonId) => lessonId.toString === data.lessonId
    );

    if (!foundLesson) {
      report.totalCompletedLessons.push(
        new mongoose.Types.ObjectId(data.lessonId)
      );
    }

    const singleModule = await Module.findById(data.moduleId);
    const lessonIdsToCheck = singleModule.lessonIds;
    const completedLessonIds = report.totalCompletedLessons;

    const isModuleComplete = lessonIdsToCheck.every((lesson) =>
      completedLessonIds.includes(lesson)
    );

    if (isModuleComplete) {
      const foundModule = report.totalCompletedModules.find(
        (module) => module.toString() === data.moduleId
      );

      if (!foundModule) {
        report.totalCompletedModules.push(
          new mongoose.Types.ObjectId(data.moduleId)
        );
      }
    }

    const course = await getCourseDetails(data.courseId);
    const modulesInCourse = course?.modules;
    const moduleCount = modulesInCourse?.length ?? 0;

    const completedModule = report.totalCompletedModules;
    const completedModuleCount = completedModule?.length ?? 0;

    if (completedModuleCount >= 1 && completedModuleCount === moduleCount) {
      report.completionDate = Date.now();
    }

    report.save();
  } catch (error) {
    throw new Error(error);
  }
}
