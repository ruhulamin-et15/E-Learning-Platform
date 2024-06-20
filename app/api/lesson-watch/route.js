import { getLoggedInUser } from "@/lib/loggedin-user";
import { Watch } from "@/model/watch-model";
import { getLesson } from "@/queries/lessons";
import { getModuleBySlug } from "@/queries/modules";
import { createWatchReport } from "@/queries/reports";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";

const STARTED = "started";
const COMPLETED = "completed";

async function updateReport(userId, courseId, moduleId, lessonId) {
  try {
    await createWatchReport({ userId, courseId, moduleId, lessonId });
  } catch (error) {
    throw new Error(error);
  }
}

export async function POST(request) {
  await dbConnect();
  const { courseId, lessonId, moduleSlug, state, lastTime } =
    await request.json();

  const lesson = await getLesson(lessonId);
  const singleModule = await getModuleBySlug(moduleSlug);
  const loggedInUser = await getLoggedInUser();

  if (!loggedInUser) {
    return new NextResponse("you are not authenticated", {
      status: 401,
    });
  }

  if (state !== STARTED && state !== COMPLETED) {
    return new NextResponse("invalid state, cannot process", {
      status: 500,
    });
  }

  if (!lesson) {
    return new NextResponse("invalid lesson, cannot process", {
      status: 500,
    });
  }

  const watchEntry = {
    lastTime,
    lesson: lesson._id,
    module: singleModule.id,
    user: loggedInUser._id,
    state,
  };

  try {
    const found = await Watch.findOne({
      lesson: lessonId,
      module: singleModule.id,
      user: loggedInUser._id,
    }).lean();

    if (state === STARTED) {
      if (!found) {
        watchEntry["created-at"] = Date.now();
        await Watch.create(watchEntry);
      }
    } else if (state === COMPLETED) {
      if (!found) {
        watchEntry["created-at"] = Date.now();
        await Watch.create(watchEntry);
        await updateReport(
          loggedInUser._id,
          courseId,
          singleModule.id,
          lessonId
        );
      } else {
        if (found.state === STARTED) {
          watchEntry["modified-at"] = Date.now();
          await Watch.findByIdAndUpdate(found._id, { state: COMPLETED });
          await updateReport(
            loggedInUser._id,
            courseId,
            singleModule.id,
            lessonId
          );
        }
      }
    }

    return new NextResponse("Watch record updated successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}
