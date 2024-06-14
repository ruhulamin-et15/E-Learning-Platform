// import { CourseProgress } from "@/components/course-progress";
import { SectionTitle } from "@/components/section-title";
import { getCourseDetailsByInstructor } from "@/queries/courses";
import { MessageSquare, Presentation, Star, UsersRound } from "lucide-react";
import CourseCard from "../../courses/_components/CourseCard";
import { getUserById } from "@/queries/users";
import Image from "next/image";

const InstructorProfile = async ({ params: { id } }) => {
  const instructor = await getUserById(id);
  console.log(instructor);
  const fullName = `${instructor?.firstName}  ${instructor?.lastName}`;
  const courseDetailsByInstructor = await getCourseDetailsByInstructor(id);
  const courses = courseDetailsByInstructor.courses;

  return (
    <section id="categories" className="space-y-6  py-6  lg:py-12">
      <div className="container grid grid-cols-12 lg:gap-x-8 gap-y-8">
        {/* Instructor Info */}
        <div className="col-span-12 lg:col-span-4 ">
          <div className="bg-white rounded-2xl p-6 shadow">
            <div className="mb-6">
              <div className="w-36 h-36 rounded-full  mb-5 mx-auto overflow-hidden">
                <Image
                  src={instructor?.profilePicture}
                  width={700}
                  height={800}
                  alt=""
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <div>
                <h4 className="text-xl lg:text-2xl text-center">{fullName}</h4>
                <div className="text-gray-600 font-medium mb-6 text-sm text-center">
                  {instructor?.designation}
                </div>
                <ul className=" items-center gap-3 flex-wrap text-sm text-gray-600 font-medium grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 md:grid-cols-4">
                  <li className="flex items-center space-x-3">
                    <Presentation className="text-gray-600 w-4" />
                    <div>{courseDetailsByInstructor.totalCourses} Courses</div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <UsersRound className="text-gray-600 w-4" />
                    <div>{courseDetailsByInstructor?.enrollments} Students</div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <MessageSquare className="text-gray-600 w-4" />
                    <div>{courseDetailsByInstructor?.reviews} Reviews</div>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="text-gray-600 w-4" />
                    <div>
                      {courseDetailsByInstructor?.ratings} Average Rating
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-600 text-xs leading-[1.8]">
              {instructor?.bio}
            </p>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <div>
            <SectionTitle className="mb-6">Courses</SectionTitle>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default InstructorProfile;

