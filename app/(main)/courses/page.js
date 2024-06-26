import SearchCourse from "./_components/SearchCourse";
import SortCourse from "./_components/SortCourse";
import FilterCourseMobile from "./_components/FilterCourseMobile";
import ActiveFilters from "./_components/ActiveFilters";
import FilterCourse from "./_components/FilterCourse";
import { getCourseList } from "@/queries/courses";
import Courses from "./_components/Courses";
import { Suspense } from "react";
import LoadingCourse from "./_components/LoadingCourses";

const CoursesPage = async ({ searchParams: { price, categories } }) => {
  const courses = await getCourseList(price, categories);
  return (
    <section
      id="courses"
      className="container space-y-6   dark:bg-transparent py-6"
    >
      <h2 className="text-xl md:text-2xl font-medium">All Courses</h2>
      <div className="flex items-baseline justify-between  border-gray-200 border-b pb-6 flex-col gap-4 lg:flex-row">
        <SearchCourse />
        <div className="flex items-center justify-end gap-2 max-lg:w-full">
          <SortCourse />
          <FilterCourseMobile />
        </div>
      </div>
      <ActiveFilters
        filterItem={{
          categories: [categories],
          price: [price],
        }}
      />
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <FilterCourse />
          <Suspense fallback={<LoadingCourse />}>
            <Courses courses={courses} />
          </Suspense>
        </div>
      </section>
    </section>
  );
};
export default CoursesPage;

