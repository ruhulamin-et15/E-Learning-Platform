import { AccordionContent } from "@/components/ui/accordion";

import { SidebarLessonItem } from "./sidebar-lesson-Item";

export const SidebarLessons = () => {
  return (
    <AccordionContent>
      <div className="flex flex-col w-full gap-3">
        <SidebarLessonItem />
      </div>
    </AccordionContent>
  );
};
