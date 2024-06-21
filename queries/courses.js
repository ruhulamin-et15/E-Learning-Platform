import { Course } from "@/model/course-model";
import { Category } from "@/model/category-model";
import { User } from "@/model/user-model";
import { Testimonial } from "@/model/testimonial-model";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";
import { Module } from "@/model/module-model";
import { dbConnect } from "@/service/mongo";
import { Lesson } from "@/model/lesson-model";
import { Quizset } from "@/model/quizset-model";
import { Quiz } from "@/model/quizzes-model";

export async function getCourseList() {
  await dbConnect();
  const courses = await Course.find({ active: true })
    .select([
      "title",
      "subtitle",
      "thumbnail",
      "modules",
      "price",
      "category",
      "instructor",
    ])
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
    })
    .populate({
      path: "modules",
      model: Module,
    })
    .lean();
  return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(id) {
  await dbConnect();
  const course = await Course.findById(id)
    .populate({
      path: "category",
      model: Category,
    })
    .populate({
      path: "instructor",
      model: User,
    })
    .populate({
      path: "testimonials",
      model: Testimonial,
      populate: {
        path: "user",
        model: User,
      },
    })
    .populate({
      path: "modules",
      model: Module,
      populate: {
        path: "lessonIds",
        model: Lesson,
      },
    })
    .populate({
      path: "quizSet",
      model: Quizset,
      populate: {
        path: "quizIds",
        model: Quiz,
      },
    })

    .lean();

  return replaceMongoIdInObject(course);
}

export async function getCourseDetailsByInstructor(instructorId, expand) {
  await dbConnect();
  const publishedCourse = await Course.find({
    instructor: instructorId,
    active: true,
  })
    .populate({
      path: "instructor",
      model: User,
    })
    .lean();

  const enrollments = await Promise.all(
    publishedCourse.map(async (course) => {
      const enrollment = await getEnrollmentsForCourse(course._id.toString());
      return {
        course: course,
        price: course.price,
        count: enrollment.length,
      };
    })
  );

  const totalEnrollments = enrollments.reduce((acc, obj) => acc + obj.count, 0);

  const totalPriceOfEnrollments = enrollments.reduce((acc, obj) => {
    return acc + obj.price * obj.count;
  }, 0);

  const testimonials = await Promise.all(
    publishedCourse.map(async (course) => {
      const testimonial = await getTestimonialsForCourse(course._id.toString());
      return testimonial;
    })
  );

  const totalTestimonials = testimonials.flat();
  const avgRating =
    totalTestimonials.reduce(function (acc, obj) {
      return acc + obj.rating;
    }, 0) / totalTestimonials.length;

  if (expand) {
    const allCourses = await Course.find({ instructor: instructorId }).lean();
    return {
      courses: allCourses?.flat(),
      enrollments: enrollments,
      reviews: totalTestimonials,
      price: totalPriceOfEnrollments,
    };
  }
  return {
    courses: replaceMongoIdInArray(publishedCourse),
    totalCourses: publishedCourse.length,
    enrollments: totalEnrollments,
    reviews: totalTestimonials.length,
    ratings: avgRating.toPrecision(2),
  };
}

export async function create(courseData) {
  await dbConnect();
  try {
    const course = await Course.create(courseData);
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    throw new Error(error);
  }
}

