import { getLoggedInUser } from "@/lib/loggedin-user";
import { hasEnrollmentsForCourse } from "@/queries/enrollments";
import Image from "next/image";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import Link from "next/link";
import { CarouselItem } from "@/components/ui/carousel";
import { EnrollCourse } from "@/components/enroll-course";

const RelatedCourseCard = async ({ course }) => {
  const loggedInUser = await getLoggedInUser();

  const hasEnrollment = await hasEnrollmentsForCourse(
    course?.id,
    loggedInUser?._id
  );
  return (
    <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/3 mb-10">
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <Link href={`/courses/${course.id}`}>
          <div className="relative w-full aspect-video rounded-md overflow-hidden">
            <Image
              src={`/assets/images/courses/${course?.thumbnail}`}
              alt={`${course?.title}`}
              className="object-cover"
              fill
            />
          </div>
          <div className="flex flex-col pt-2">
            <div className="text-lg md:text-base font-medium group-hover:text-sky-700 line-clamp-2">
              {course?.title}
            </div>
            <p className="text-xs text-muted-foreground">
              {course?.category?.title}
            </p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 text-slate-500">
                <div>
                  <BookOpen className="w-4" />
                </div>
                <span>{course?.modules?.length}</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex flex-row justify-between">
          <div className="flex items-center justify-between mt-4">
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(course?.price)}
            </p>
          </div>
          <div className="mt-4">
            {hasEnrollment ? (
              <Link
                href={`/courses/${course.id}/lesson`}
                variant="ghost"
                className="text-xs text-white border bg-green-400 px-1 py-2 rounded-md gap-1"
              >
                Accees Course
              </Link>
            ) : (
              <EnrollCourse asLink={true} courseId={course.id} />
            )}
          </div>
        </div>
      </div>
    </CarouselItem>
  );
};

export default RelatedCourseCard;
