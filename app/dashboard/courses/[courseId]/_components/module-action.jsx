"use client";

import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { changeModulePublishState, deleteModule } from "@/app/actions/module";
import { useRouter } from "next/navigation";

export const ModuleActions = ({ module, courseId }) => {
  const [action, setAction] = useState(null);
  const [publish, setPublish] = useState(module?.active);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      switch (action) {
        case "change-active": {
          const activeState = await changeModulePublishState(module?.id);
          setPublish(!activeState);
          toast.success(
            `The module has been ${publish ? "Unpublish" : "Publish"}`
          );
          router.refresh();
          break;
        }
        case "delete": {
          if (publish) {
            toast.error(
              "A published module can't be deleted. First unpublish it, then delete!"
            );
          } else if (
            window.confirm("Are you sure want to delete this module?")
          ) {
            await deleteModule(module.id, courseId);
            toast.success("This module has been deleted");
            router.push(`/dashboard/courses/${courseId}`);
          }
          break;
        }
        default: {
          throw new Error("Invalid Module Action");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-x-2">
        <Button
          onClick={() => setAction("change-active")}
          variant="outline"
          size="sm"
        >
          {publish ? "Unpublish" : "Publish"}
        </Button>

        <Button onClick={() => setAction("delete")} size="sm">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
