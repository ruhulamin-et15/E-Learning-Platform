"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { debounce } from "@/lib/debounce";

const SearchCourse = () => {
  const [searchItem, setSearchItem] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleChange = (e) => {
    setSearchItem(e.target.value);
    debounceUpdateSearch(e.target.value);
  };

  const updateSearch = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const debounceUpdateSearch = debounce(updateSearch, 500);

  return (
    <div className="relative h-10 max-lg:w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
      <Input
        type="text"
        value={searchItem}
        onChange={handleChange}
        placeholder="Search courses..."
        className="pl-8 pr-3 py-2 text-sm"
      />
    </div>
  );
};

export default SearchCourse;

