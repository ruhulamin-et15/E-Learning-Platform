"use client";
import { deleteQuiz } from "@/app/actions/quizzes";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const QuizCardActions = ({ quiz, quizSetId }) => {
  const router = useRouter();
  async function handleDelete() {
    try {
      if (confirm("Are you sure want to delete this quiz?")) {
        await deleteQuiz(quiz.id, quizSetId);
        toast.success("Quiz has been deleted");
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <>
      <Link
        className="flex flex-row"
        href={`/dashboard/quiz-sets/${quizSetId}/edit-quiz/${quiz.id}`}
        variant="ghost"
        size="sm"
      >
        <Pencil className="w-3 mr-1" /> Edit
      </Link>
      <Button
        onClick={handleDelete}
        size="sm"
        className="text-destructive"
        variant="ghost"
      >
        <Trash className="w-3 mr-1" /> Delete
      </Button>
    </>
  );
};

export default QuizCardActions;
