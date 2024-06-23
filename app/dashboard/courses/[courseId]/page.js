import { IconBadge } from "@/components/icon-badge";
import {
  Book,
  CircleDollarSign,
  LayoutDashboard,
  ListChecks,
  TagIcon,
} from "lucide-react";
import { CategoryForm } from "./_components/category-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { ModulesForm } from "./_components/module-form";
import { PriceForm } from "./_components/price-form";
import { TitleForm } from "./_components/title-form";
import { CourseActions } from "./_components/course-action";
import AlertBanner from "@/components/alert-banner";
import { QuizSetForm } from "./_components/quiz-set-form";
import { getCourseDetails } from "@/queries/courses";
import { getCategories } from "@/queries/categories";
import { replaceMongoIdInArray } from "@/lib/convertData";
import { getAllQuizSets } from "@/queries/quizzes";
import { TagForm } from "./_components/tag-form";
import { LearningForm } from "./_components/learning-form";

const EditCourse = async ({ params: { courseId } }) => {
  const course = await getCourseDetails(courseId);
  const categories = await getCategories();
  const mappedCategories = categories.map((c) => {
    return {
      value: c.title,
      label: c.title,
      id: c.id,
    };
  });

  const allQuizSet = await getAllQuizSets(true);

  let mappedQuizSet = {};
  if (allQuizSet && allQuizSet.length > 0) {
    mappedQuizSet = allQuizSet.map((quizset) => {
      return {
        value: quizset.id,
        label: quizset.title,
      };
    });
  }

  const modules = replaceMongoIdInArray(course?.modules).sort(
    (a, b) => a.order - b.order
  );

  return (
    <>
      {!course?.active && (
        <AlertBanner
          label="This course is unpublished. It will not be visible in the course."
          variant="warning"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-end">
          <CourseActions courseId={courseId} isActive={course?.active} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your course</h2>
            </div>
            <TitleForm
              initialData={{
                title: course?.title,
              }}
              courseId={courseId}
            />
            <DescriptionForm
              initialData={{ description: course?.description }}
              courseId={courseId}
            />
            <ImageForm
              initialData={{
                imageUrl: `/assets/images/courses/${course?.thumbnail}`,
              }}
              courseId={courseId}
            />
            <CategoryForm
              options={mappedCategories}
              initialData={{ value: course?.category?.title }}
              courseId={courseId}
            />
            <QuizSetForm
              initialData={{ quizSetId: course?.quizSet?._id.toString() }}
              courseId={courseId}
              options={mappedQuizSet}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course Modules</h2>
              </div>
              <ModulesForm initialData={modules} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2 mb-6">
                <IconBadge icon={Book} />
                <h2 className="text-xl">What You Learn From</h2>
              </div>
              <LearningForm initialData={course} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={TagIcon} />
                <h2 className="text-xl">Tag</h2>
              </div>
              <TagForm initialData={{ tag: course?.tag }} courseId={courseId} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell you course</h2>
              </div>
              <PriceForm
                initialData={{ price: course?.price }}
                courseId={courseId}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditCourse;

