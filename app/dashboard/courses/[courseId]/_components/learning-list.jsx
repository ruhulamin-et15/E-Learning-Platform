"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const LearningList = ({ items }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [learnitems, setLearntems] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setLearntems(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      {learnitems?.map((item, index) => (
        <div key={index} className="flex flex-row">
          <div
            className={cn(
              "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
            )}
          >
            <Star className="h-5 w-5" />
          </div>
          <div className="mt-3">{item}</div>
        </div>
      ))}
    </div>
  );
};
