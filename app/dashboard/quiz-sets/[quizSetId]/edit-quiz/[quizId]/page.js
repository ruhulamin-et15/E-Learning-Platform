import { getQuizById } from "@/queries/quizzes";
import { EditQuizForm } from "../../_components/edit-quiz-form";

const EditQuizPage = async ({ params: { quizId, quizSetId } }) => {
  const quiz = await getQuizById(quizId);
  return <EditQuizForm quizId={quizId} quiz={quiz} quizSetId={quizSetId} />;
};
export default EditQuizPage;
