"use client";

import ReactPlayer from "react-player";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const LessonVideo = ({ lesson, courseId, module }) => {
  const [hasWindow, setHasWindow] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  useEffect(() => {
    async function updateLessonWatch() {
      const response = await fetch("/api/lesson-watch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseId,
          lessonId: lesson?.id,
          moduleSlug: module,
          state: "started",
          lastTime: 0,
        }),
      });

      if (response.status === 200) {
        const result = await response.text();
        console.log(result);
        setStarted(true);
      }
    }
    started && updateLessonWatch();
  }, [started, lesson?.id, courseId, module]);

  useEffect(() => {
    async function updateLessonWatch() {
      const response = await fetch("/api/lesson-watch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseId,
          lessonId: lesson?.id,
          moduleSlug: module,
          state: "completed",
          lastTime: 0,
        }),
      });

      if (response.status === 200) {
        await response.text();
        setEnded(false);
        router.refresh();
      }
    }
    ended && updateLessonWatch();
  }, [ended]);

  function handleOnStart() {
    setStarted(true);
  }

  function handleOnEnded() {
    setEnded(true);
  }

  return (
    <>
      {!lesson ? (
        <div className="flex items-center justify-center h-[470px] w-[100%] border border-red-500 rounded-md">
          <p className="font-bold text-lg">No Video Available Now</p>
        </div>
      ) : (
        <>
          {hasWindow && (
            <ReactPlayer
              url={lesson?.video_url}
              width="100%"
              height="470px"
              controls={true}
              onStart={handleOnStart}
              onEnded={handleOnEnded}
            />
          )}
        </>
      )}
    </>
  );
};
