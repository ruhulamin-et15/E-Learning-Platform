import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionTitle } from "@/components/section-title";

import { relatedCourses } from "@/queries/courses";
import RelatedCourseCard from "./RelatedCourseCard";

const RelatedCourses = async ({ tag }) => {
  const courses = await relatedCourses(tag);

  return (
    <section className="">
      <div className="container">
        <SectionTitle className="mb-6">Related Courses</SectionTitle>
        <Carousel
          opts={{
            align: "start",
          }}
          className="max-2xl:w-[90%] w-full mx-auto"
        >
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent>
            {courses.map((course) => (
              <RelatedCourseCard key={course.id} course={course} />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default RelatedCourses;

