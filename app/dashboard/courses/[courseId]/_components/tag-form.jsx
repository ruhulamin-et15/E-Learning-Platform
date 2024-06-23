"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateCourse } from "@/app/actions/course";

const formSchema = z.object({
  tag: z.string().min(1),
});

export const TagForm = ({ initialData, courseId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [tags, setTags] = useState(initialData?.tag);

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tag: tags ?? undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    console.log(values);
    try {
      await updateCourse(courseId, { tag: values.tag });
      setTags(values.tag);
      toggleEdit();
      router.refresh();
      toast.success("Course tag has been updated");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-gray-50 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Tag
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Tag
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn("text-sm mt-2", !tags && "text-slate-500 italic")}>
          {tags ? tags : "No tag"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={isSubmitting}
                      placeholder="add comma separated tag for your course"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
