"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  changeQuizSetPublishState,
  deleteQuizSet,
} from "@/app/actions/quizzes";

export const QuizSetAction = ({ quizSets, quizSetId }) => {
  const [action, setAction] = useState(null);
  const [publish, setPublish] = useState(quizSets.active);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      switch (action) {
        case "change-active": {
          const activeState = await changeQuizSetPublishState(quizSetId);
          setPublish(!activeState);
          toast.success(
            `QuizSet has been ${publish ? "Unpublish" : "Publish"}`
          );
          router.refresh();
          break;
        }
        case "delete": {
          if (publish) {
            toast.error(
              "A published quiz set can't be deleted. First unpublish it, then delete!"
            );
          } else if (
            window.confirm("Are you sure want to delete this quiz set?")
          ) {
            await deleteQuizSet(quizSetId);
            toast.success("Quiz set has been deleted");
            router.push(`/dashboard/quiz-sets`);
          }
          break;
        }
        default: {
          throw new Error("invalid action");
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

