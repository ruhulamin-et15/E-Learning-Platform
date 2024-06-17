"use client";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { changeCourseState, deleteCourse } from "@/app/actions/course";

export const CourseActions = ({ courseId, isActive }) => {
  const [action, setAction] = useState(null);
  const [publish, setPublish] = useState(isActive);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      switch (action) {
        case "change-active": {
          const activeState = await changeCourseState(courseId);
          setPublish(!activeState);
          toast.success(
            `The course has been ${publish ? "Unpublish" : "Publish"}`
          );
          router.refresh();
          break;
        }
        case "delete": {
          if (publish) {
            toast.error(
              "A published course can't be deleted. First unpublish it, then delete!"
            );
          } else if (
            window.confirm("Are you sure want to delete this course?")
          ) {
            await deleteCourse(courseId);
            toast.success("This course has been deleted");
            router.push(`/dashboard/courses`);
          }
          break;
        }
        default: {
          throw new Error("Invalid course action");
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

