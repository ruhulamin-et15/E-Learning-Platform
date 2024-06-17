"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { changeLessonPublishState, deleteLesson } from "@/app/actions/lesson";

export const LessonActions = ({ lesson, moduleId, onDelete }) => {
  const [action, setAction] = useState(null);
  const [publish, setPublish] = useState(lesson?.published);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      switch (action) {
        case "change-active": {
          const activeState = await changeLessonPublishState(lesson.id);
          setPublish(!activeState);
          toast.success(
            `The lesson has been ${publish ? "Unpublish" : "Publish"}`
          );
          break;
        }
        case "delete": {
          if (publish) {
            toast.error(
              "A published lesson can't be deleted. First unpublish it, then delete!"
            );
          } else if (
            window.confirm("Are you sure want to delete this lesson?")
          ) {
            await deleteLesson(lesson.id, moduleId);
            onDelete();
            toast.success("This lesson has been deleted");
          }
          break;
        }
        default: {
          throw new Error("Invalid lesson action");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => setAction("change-active")}
          variant="outline"
          size="sm"
        >
          {publish ? "Unpublish" : "Publish"}
        </Button>

        <Button onClick={() => setAction("delete")} size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
