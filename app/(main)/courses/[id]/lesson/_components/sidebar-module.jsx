import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { SidebarLessons } from "./sidebar-lessons";

export const SidebarModule = () => {
  return (
    <Accordion
      defaultValue="item-1"
      type="single"
      collapsible
      className="w-full px-6"
    >
      <AccordionItem className="border-0" value="item-1">
        <AccordionTrigger>Introduction </AccordionTrigger>
        <SidebarLessons />
      </AccordionItem>
    </Accordion>
  );
};
