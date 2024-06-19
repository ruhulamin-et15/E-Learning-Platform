import { CourseProgress } from "@/components/course-pregress";
import GiveReview from "./give-review";
import DownloadCertificate from "./download-certificate";
import { SidebarModule } from "./sidebar-module";

export const CourseSidebar = () => {
  return (
    <>
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold mt-14">Reactive Accelerator</h1>
          <div className="mt-4">
            <CourseProgress variant="success" value={80} />
          </div>
        </div>
        <SidebarModule />
        <div className="w-full px-6">
          <DownloadCertificate />
          <GiveReview />
        </div>
      </div>
    </>
  );
};

