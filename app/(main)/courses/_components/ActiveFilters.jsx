"use client";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const ActiveFilter = ({ filterItem }) => {
  const [filter, setFilter] = useState(filterItem);

  useEffect(() => {
    setFilter(filterItem);
  }, [filterItem]);

  const applyArrayFilter = ({ type, value }) => {
    const isFilterApplied = filter[type].includes(value);

    if (isFilterApplied) {
      setFilter((prev) => ({
        ...prev,
        [type]: prev[type].filter((v) => v !== value),
      }));
    } else {
      setFilter((prev) => ({
        ...prev,
        [type]: [...prev[type], value],
      }));
    }
  };
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {filter.categories.length > 0 &&
        filter.categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
            onClick={() =>
              applyArrayFilter({ type: "categories", value: category })
            }
          >
            {category}
            <X className="w-3" />
          </Button>
        ))}
      {filter.price.length > 0 &&
        filter.price.map((price) => (
          <Button
            key={price}
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
            onClick={() => applyArrayFilter({ type: "price", value: price })}
          >
            {price}
            <X className="w-3" />
          </Button>
        ))}
    </div>
  );
};

export default ActiveFilter;

