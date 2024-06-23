"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { LearningList } from "./learning-list";
import { updateCourse } from "@/app/actions/course";

const formSchema = z.object({
  learning: z.array(
    z.object({
      item: z.string().min(1),
    })
  ),
});

export const LearningForm = ({ initialData, courseId }) => {
  const [learningItems, setLearningItems] = useState(initialData?.learning);
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreating = () => setIsCreating((current) => !current);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      learning: learningItems.map((item, index) => ({
        id: index,
        item: item,
      })) || [{ id: 0, item: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "learning",
  });

  const { isSubmitting, isValid } = form.formState;

  const addNewItem = () => {
    append({ id: learningItems.length + fields.length, item: "" });
  };

  const removeItem = (index) => {
    remove(index);
  };

  const onSubmit = async (values) => {
    const updatedValues = values.learning.map((item) => item.item);
    try {
      await updateCourse(courseId, {
        learning: updatedValues,
      });
      setLearningItems(updatedValues);
      toast.success("Items have been added and updated");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        What Learning
        <Button variant="ghost" onClick={toggleCreating}>
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add/Edit Learning Items
            </>
          )}
        </Button>
      </div>

      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`learning.${index}.item`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="e.g. 'Add new item'"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button variant="ghost" type="button" onClick={addNewItem}>
              Add Another Item
            </Button>
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create/Update Items
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !learningItems?.length && "text-slate-500 italic"
          )}
        >
          {!learningItems.length && "No Learning Item"}
          <LearningList items={learningItems || []} />
        </div>
      )}
    </div>
  );
};
