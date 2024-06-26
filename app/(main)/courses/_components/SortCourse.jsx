"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

const SortCourse = () => {
  const [selectedPrice, setSelectedPrice] = useState("");

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleShortChange = (option) => {
    setSelectedPrice(option);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const price = params.get("price");
    if (price) {
      setSelectedPrice(price);
    }
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedPrice) {
      params.set("price", selectedPrice);
    } else {
      params.delete("price");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, selectedPrice, pathname, replace]);

  return (
    <Select onValueChange={handleShortChange}>
      <SelectTrigger className="w-[180px] border-none !border-b focus:ring-0 focus:ring-offset-0  overflow-hidden">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              className="cursor-pointer"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortCourse;

