import { Testimonial } from "@/model/testimonial-model";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { dbConnect } from "@/service/mongo";

export async function getTestimonialsForCourse(courseId) {
  await dbConnect();
  const testimonials = await Testimonial.find({ courseId: courseId }).lean();
  return replaceMongoIdInArray(testimonials);
}

export async function create(testimonialData) {
  await dbConnect();
  try {
    const testimonial = await Testimonial.create(testimonialData);
    return JSON.parse(JSON.stringify(testimonial));
  } catch (error) {
    throw new Error(error);
  }
}

