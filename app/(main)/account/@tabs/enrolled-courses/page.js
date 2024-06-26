import { getEnrollmentsForUser } from "@/queries/enrollments";
import EnrolledCourseCard from "../../component/enrolled-coursecard";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";

async function EnrolledCourses() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const loggedInUser = await getUserByEmail(session?.user?.email);

  const enrollments = await getEnrollmentsForUser(loggedInUser?._id);

  return (
    <>
      {enrollments && enrollments.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {enrollments.map((enrollment) => (
            <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[500px] border border-gray-200 rounded-md">
          <h className="text-xl font-bold">No Enrollment Founds</h>
        </div>
      )}
    </>
  );
}

export default EnrolledCourses;

