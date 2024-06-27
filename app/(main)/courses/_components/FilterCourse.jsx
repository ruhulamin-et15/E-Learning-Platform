"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CATEGORY_OPTIONS = [
  {
    id: 1,
    label: "Design",
    value: "design",
  },

  {
    id: 3,
    label: "Development",
    value: "development",
  },
  {
    id: 4,
    label: "Marketing",
    value: "marketing",
  },
  {
    id: 5,
    label: "IT & Software",
    value: "it-software",
  },
  {
    id: 6,
    label: "Personal Development",
    value: "personal-development",
  },
  {
    id: 7,
    label: "Business",
    value: "business",
  },
  {
    id: 8,
    label: "Photography",
    value: "photography",
  },
  {
    id: 9,
    label: "Music",
    value: "music",
  },
];

const FilterCourse = () => {
  const [filter, setFilter] = useState({
    categories: ["development"],
    price: ["free"],
    search: ["js"],
  });

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const categories = params.get("categories");
    const price = params.get("price");
    const search = params.get("search");

    setFilter({
      categories: categories ? categories.split(",") : [],
      price: price ? price.split(",") : [],
      search: search ? search.split(",") : [],
    });
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filter.categories.length) {
      params.set("categories", filter.categories.join(","));
    }
    if (filter.price.length) {
      params.set("price", filter.price.join(","));
    }
    if (filter.search.length) {
      params.set("search", filter.search.join(","));
    }
    replace(`${pathname}?${params.toString()}`);
  }, [filter, pathname, replace]);

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
    <div className="hidden lg:block">
      <Accordion defaultValue={["categories"]} type="multiple">
        <AccordionItem value="categories">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Categories</span>
          </AccordionTrigger>
          <AccordionContent className="pt-6 animate-none">
            <ul className="space-y-4">
              {CATEGORY_OPTIONS.map((option, optionIdx) => (
                <li key={option.value} className="flex items-center">
                  <Checkbox
                    type="checkbox"
                    id={`category-${optionIdx}`}
                    onCheckedChange={() => {
                      applyArrayFilter({
                        type: "categories",
                        value: option.value,
                      });
                    }}
                    checked={filter.categories.includes(option.value)}
                  />
                  <label
                    htmlFor={`category-${optionIdx}`}
                    className="ml-3 text-sm text-gray-600 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FilterCourse;

