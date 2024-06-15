import { Assessment } from "@/model/assessment-model";
import { Report } from "@/model/report-model";
import { dbConnect } from "@/service/mongo";

export async function getReport(filter) {
  await dbConnect();
  try {
    const report = await Report.findOne(filter)
      .populate({
        path: "quizAssessment",
        ref: Assessment,
      })
      .lean();
    return report;
  } catch (error) {
    throw new Error(error);
  }
}
