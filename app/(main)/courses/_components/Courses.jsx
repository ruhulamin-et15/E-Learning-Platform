import CourseCard from "./CourseCard";

const Courses = ({ courses }) => {
  return (
    <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {courses.map((course) => (
        <CourseCard key={course?.id} course={course} />
      ))}
    </div>
  );
};

export default Courses;
