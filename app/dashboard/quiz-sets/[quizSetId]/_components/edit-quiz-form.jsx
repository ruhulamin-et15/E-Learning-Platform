"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { editQuiz } from "@/app/actions/quizzes";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const formSchema = z.object({
  title: z
    .string({
      required_error: "Question is required",
    })
    .min(1, {
      message: "Title is required",
    }),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, {
      message: "Description is required",
    }),
  optionA: z.object({
    label: z
      .string({
        required_error: "Option label is required",
      })
      .min(1, {
        message: "Option label is required",
      }),
    isTrue: z.boolean().default(false),
  }),
  optionB: z.object({
    label: z
      .string({
        required_error: "Option label is required",
      })
      .min(1, {
        message: "Option label is required",
      }),
    isTrue: z.boolean().default(false),
  }),
  optionC: z.object({
    label: z
      .string({
        required_error: "Option label is required",
      })
      .min(1, {
        message: "Option label is required",
      }),
    isTrue: z.boolean().default(false),
  }),
  optionD: z.object({
    label: z
      .string({
        required_error: "Option label is required",
      })
      .min(1, {
        message: "Option label is required",
      }),
    isTrue: z.boolean().default(false),
  }),
});

export const EditQuizForm = ({ quizId, quiz, quizSetId }) => {
  const router = useRouter();

  const defaultValues = quiz
    ? {
        title: quiz.question,
        description: quiz.description,
        optionA: {
          label: quiz.options[0].text,
          isTrue: quiz.options[0].is_correct,
        },
        optionB: {
          label: quiz.options[1].text,
          isTrue: quiz.options[1].is_correct,
        },
        optionC: {
          label: quiz.options[2].text,
          isTrue: quiz.options[2].is_correct,
        },
        optionD: {
          label: quiz.options[3].text,
          isTrue: quiz.options[3].is_correct,
        },
      }
    : {
        title: "",
        description: "",
        optionA: {
          label: "",
          isTrue: false,
        },
        optionB: {
          label: "",
          isTrue: false,
        },
        optionC: {
          label: "",
          isTrue: false,
        },
        optionD: {
          label: "",
          isTrue: false,
        },
      };

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues,
  });

  const { isSubmitting, errors } = form.formState;
  console.log(errors);

  const onSubmit = async (values) => {
    const transformedVaule = {
      question: values.title,
      description: values.description,
      options: [
        {
          text: values.optionA.label,
          is_correct: values.optionA.isTrue,
        },
        {
          text: values.optionB.label,
          is_correct: values.optionB.isTrue,
        },
        {
          text: values.optionC.label,
          is_correct: values.optionC.isTrue,
        },
        {
          text: values.optionD.label,
          is_correct: values.optionD.isTrue,
        },
      ],
    };
    try {
      const correctness = [
        values.optionA.isTrue,
        values.optionB.isTrue,
        values.optionC.isTrue,
        values.optionD.isTrue,
      ];

      const correctMarked = correctness.filter((c) => c);

      const isOneCorrectMarked = correctMarked.length === 1;

      if (isOneCorrectMarked) {
        await editQuiz(quizId, transformedVaule);
        toast.success("Quiz edit successfully");
        router.push(`/dashboard/quiz-sets/${quizSetId}`);
      } else {
        toast.error("You must mark only one correct answer.");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mx-auto mt-6 border bg-gray-50 rounded-md p-4 w-[80%]">
      <Link
        href={`/dashboard/quiz-sets/${quizSetId}`}
        className="flex items-center text-sm hover:opacity-75 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to quizset setup
      </Link>
      <div className="font-medium flex items-center justify-between">
        Edit Quiz
      </div>
      {
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-row mt-4 space-x-8"
          >
            <div className="w-[50%]">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="Enter quiz question"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="Enter quiz description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-[50%]">
              {/* --------------- OPTION A -------- */}
              <div className="space-y-3">
                <FormLabel>Option A</FormLabel>
                <div className="flex items-start gap-3">
                  <FormField
                    control={form.control}
                    name="optionA.isTrue"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="optionA.label"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="Enter quiz question"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* --------------- OPTION A ENDS -------- */}

              {/* --------------- OPTION B -------- */}
              <div className="space-y-3">
                <FormLabel>Option B</FormLabel>
                <div className="flex items-start gap-3">
                  <FormField
                    control={form.control}
                    name="optionB.isTrue"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="optionB.label"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="Enter quiz question"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* --------------- OPTION B ENDS -------- */}

              {/* --------------- OPTION C -------- */}
              <div className="space-y-3">
                <FormLabel>Option C</FormLabel>
                <div className="flex items-start gap-3">
                  <FormField
                    control={form.control}
                    name="optionC.isTrue"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="optionC.label"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="Enter quiz question"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* --------------- OPTION C ENDS -------- */}

              {/* --------------- OPTION D -------- */}
              <div className="space-y-3">
                <FormLabel>Option D</FormLabel>
                <div className="flex items-start gap-3">
                  <FormField
                    control={form.control}
                    name="optionD.isTrue"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="optionD.label"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              disabled={isSubmitting}
                              placeholder="Enter quiz question"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              {/* --------------- OPTION D ENDS -------- */}
              <div className="flex items-center gap-x-2 mt-4">
                <Button disabled={isSubmitting} type="submit" className="px-8">
                  Edit Quiz
                </Button>
              </div>
            </div>
          </form>
        </Form>
      }
    </div>
  );
};
