import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Video } from "lucide-react";
import CourseLessonList from "./CourseLessonList";
import { durationFormate } from "@/lib/date";

const CourseModuleList = ({ module }) => {
  const totalDuration = module?.lessonIds.reduce(function (acc, obj) {
    return acc + obj.duration;
  }, 0);
  return (
    <AccordionItem className="border-none" value="item-1">
      <AccordionTrigger>{module?.title}</AccordionTrigger>
      <AccordionContent>
        <div class="flex gap-x-5 items-center flex-wrap mt-4 mb-6 text-gray-600 text-sm">
          <span className="flex items-center gap-1.5">
            <Video className="w-4 h-4" />
            {durationFormate(totalDuration)} Hours
          </span>
        </div>
        <div className="space-y-3">
          {module?.lessonIds &&
            module?.lessonIds.map((lessonId, index) => (
              <CourseLessonList key={index} lessonId={lessonId} />
            ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CourseModuleList;

