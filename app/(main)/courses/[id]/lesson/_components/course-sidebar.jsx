import { CourseProgress } from "@/components/course-pregress";
import GiveReview from "./give-review";
import DownloadCertificate from "./download-certificate";
import { SidebarModule } from "./sidebar-module";
import { getCourseDetails } from "@/queries/courses";
import { Watch } from "@/model/watch-model";
import { getLoggedInUser } from "@/lib/loggedin-user";
import { getReport } from "@/queries/reports";
import mongoose from "mongoose";

export const CourseSidebar = async ({ courseId }) => {
  console.log(courseId);
  const course = await getCourseDetails(courseId);
  const loggedInUser = await getLoggedInUser();

  const report = await getReport({
    course: new mongoose.Types.ObjectId(courseId),
    student: loggedInUser._id,
  });

  const totalCompletedModules = report?.totalCompletedModules
    ? report?.totalCompletedModules.length
    : 0;

  const totalModules = course?.modules ? course?.modules.length : 0;

  const totalProgress =
    totalModules > 0 ? (totalCompletedModules / totalModules) * 100 : 0;

  const updatedModules = await Promise.all(
    course?.modules.map(async (module) => {
      const lessons = module?.lessonIds;

      await Promise.all(
        lessons.map(async (lesson) => {
          const lessonId = lesson?._id.toString();
          const watch = await Watch.findOne({
            lesson: lessonId,
            user: loggedInUser._id,
          }).lean();

          if (watch?.state === "completed") {
            lesson.state = "completed";
          }
          return lesson;
        })
      );
      return module;
    })
  );

  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold mt-14">Reactive Accelerator</h1>
          <div className="mt-4">
            <CourseProgress variant="success" value={totalProgress} />
          </div>
        </div>
        <SidebarModule courseId={courseId} modules={updatedModules} />
        <div className="w-full px-6">
          <DownloadCertificate courseId={courseId} />
          <GiveReview />
        </div>
      </div>
    </>
  );
};

