import mongoose, { Schema } from "mongoose";

const quizzesSchema = new Schema({
  question: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  options: {
    type: Array,
  },
  explanations: {
    type: String,
  },
  mark: {
    required: true,
    default: 5,
    type: Number,
  },
  slug: {
    type: String,
  },
});

export const Quiz =
  mongoose.models.Quiz ?? mongoose.model("Quiz", quizzesSchema);
