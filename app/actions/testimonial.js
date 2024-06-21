"use server";

import { Course } from "@/model/course-model";
import { create } from "@/queries/testimonials";
import { dbConnect } from "@/service/mongo";

export async function CreateTestimonial(testimonialData) {
  await dbConnect();
  try {
    const testimonial = await create(testimonialData);
    const course = await Course.findById(testimonialData.courseId);
    course.testimonials.push(testimonial._id);
    course.save();
    return testimonial;
  } catch (error) {
    throw new Error(error);
  }
}
