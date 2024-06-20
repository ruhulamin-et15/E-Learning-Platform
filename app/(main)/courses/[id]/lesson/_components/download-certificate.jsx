"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

const DownloadCertificate = ({ courseId, totalProgress }) => {
  const [loading, setLoading] = useState(false);

  const handleCertificateDownLoad = async () => {
    try {
      fetch(`/api/certificate?courseId=${courseId}`)
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Certificate.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
        });

      toast.success("Certificate has been downloaded");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCertificateDownLoad}
      disabled={totalProgress < 100}
      className="w-full mt-6"
    >
      {loading ? "DownLoading Certificate" : "Download Certificate"}
    </Button>
  );
};

export default DownloadCertificate;
