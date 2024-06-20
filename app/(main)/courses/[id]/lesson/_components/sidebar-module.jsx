"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { SidebarLessons } from "./sidebar-lessons";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { useSearchParams } from "next/navigation";

export const SidebarModule = ({ courseId, modules }) => {
  const searchParams = useSearchParams();

  const allModules = replaceMongoIdInArray(modules).toSorted(
    (a, b) => a.order - b.order
  );

  const query = searchParams.get("name");

  const expandedModule = allModules.find((module) => {
    return module.lessonIds.find((lesson) => {
      return lesson.slug === query;
    });
  });

  const expandedModuleId = expandedModule?.id ?? allModules[0]?.id;

  return (
    <Accordion
      defaultValue={expandedModuleId}
      type="single"
      collapsible
      className="w-full px-6"
    >
      {allModules.map((module) => (
        <AccordionItem key={module?.id} className="border-0" value={module?.id}>
          <AccordionTrigger>{module?.title} </AccordionTrigger>
          <SidebarLessons
            courseId={courseId}
            lessons={module?.lessonIds}
            moduleSlug={module?.slug}
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
};
