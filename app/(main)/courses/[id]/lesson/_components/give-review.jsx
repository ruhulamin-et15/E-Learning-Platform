"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReviewModal } from "./review-modal";

const GiveReview = ({ userId, courseId }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsReviewModalOpen(true)}
        variant="outline"
        className="w-full mt-6"
      >
        Give Review
      </Button>
      <ReviewModal
        open={isReviewModalOpen}
        setOpen={setIsReviewModalOpen}
        userId={userId}
        courseId={courseId}
      />
    </>
  );
};

export default GiveReview;
