import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
  totalCompletedLessons: {
    required: false,
    type: Array,
  },
  totalCompletedModules: {
    required: false,
    type: Array,
  },
  course: { type: Schema.ObjectId, ref: "Course" },
  student: { type: Schema.ObjectId, ref: "User" },
  quizAssessment: { type: Schema.ObjectId, ref: "Assessment" },
});

export const Report =
  mongoose.models.Report ?? mongoose.model("Report", reportSchema);
