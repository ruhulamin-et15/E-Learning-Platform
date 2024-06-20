"use client";
import { Button } from "@/components/ui/button";

const DownloadCertificate = ({ courseId, totalProgress }) => {
  return (
    <Button disabled={totalProgress < 100} className="w-full mt-6">
      Download Certificate
    </Button>
  );
};

export default DownloadCertificate;
