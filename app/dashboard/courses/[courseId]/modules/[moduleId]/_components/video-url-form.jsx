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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateLesson } from "@/app/actions/lesson";
import { durationFormate } from "@/lib/date";
import ReactPlayer from "react-player";

const formSchema = z.object({
  url: z.string().min(1, {
    message: "Url is Required",
  }),
  duration: z.string().min(1, {
    message: "Duration is Required",
  }),
});

export const VideoUrlForm = ({ initialData, lessonId }) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState(initialData?.url);

  const toggleEdit = () => setIsEditing((current) => !current);

  const formData = {
    ...initialData,
    duration: durationFormate(initialData?.duration),
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values) => {
    try {
      const payload = {};
      payload["video_url"] = values?.url;
      const duration = values?.duration;
      const splitted = duration.split(":");

      if (splitted.length === 3) {
        payload["duration"] =
          splitted[0] * 3600 + splitted[1] * 60 + splitted[2] * 1;

        await updateLesson(lessonId, payload);
        setUrl(values.url);
        toast.success("Lesson url and duration updated");
        toggleEdit();
        router.refresh();
      } else {
        toast.error("The duration format must be hh:mm:ss");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Video URL
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit URL
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p className="text-sm mt-2">{url}</p>
          <div className="mt-6">
            <ReactPlayer
              url={url}
              width="100%"
              height="400px"
              controls={true}
            />
          </div>
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {/* url */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* duration */}
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Duration</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'hh:mm:ss'"
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

