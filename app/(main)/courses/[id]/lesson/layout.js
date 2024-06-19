import { getLoggedInUser } from "@/lib/loggedin-user";
import { CourseSidebar } from "./_components/course-sidebar";
import { CourseSidebarMobile } from "./_components/course-sidebar-mobile";
import { redirect } from "next/navigation";
import { hasEnrollmentsForCourse } from "@/queries/enrollments";

const CourseLayout = async ({ children, params: { id } }) => {
  const loggedInUser = await getLoggedInUser();

  const hasEnrollment = await hasEnrollmentsForCourse(id, loggedInUser?._id);

  if (!loggedInUser) {
    redirect("/login");
  } else if (!hasEnrollment) {
    redirect("/courses");
  }

  return (
    <div className="">
      <div className="h-[80px] lg:pl-96 top-[60px] fixed inset-y-0 w-full z-10">
        <div className="p-4 lg:hidden border-b h-full flex items-center bg-white shadow-sm relative">
          <CourseSidebarMobile courseId={id} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="hidden lg:flex h-full w-96  flex-col fixed inset-y-0 z-50">
          <CourseSidebar courseId={id} />
        </div>
        <main className="lg:pl-96 pt-[80px] lg:pt-[20px] h-full col-span-10 px-4">
          {children}
        </main>
      </div>
    </div>
  );
};
export default CourseLayout;

