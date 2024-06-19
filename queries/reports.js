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
    if (!report) {
      console.log("No report found with the given filter:", filter);
      return null;
    }
    return report;
  } catch (error) {
    throw new Error(error);
  }
}
