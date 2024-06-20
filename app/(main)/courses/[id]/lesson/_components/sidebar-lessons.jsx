import { AccordionContent } from "@/components/ui/accordion";

import { SidebarLessonItem } from "./sidebar-lesson-Item";
import { replaceMongoIdInArray } from "@/lib/convertData";

export const SidebarLessons = ({ courseId, lessons, moduleSlug }) => {
  const allLessons = replaceMongoIdInArray(lessons).toSorted(
    (a, b) => a.order - b.order
  );

  return (
    <AccordionContent>
      <div className="flex flex-col w-full gap-3">
        {allLessons.map((lesson) => (
          <SidebarLessonItem
            key={lesson?.id}
            lesson={lesson}
            courseId={courseId}
            moduleSlug={moduleSlug}
          />
        ))}
      </div>
    </AccordionContent>
  );
};
