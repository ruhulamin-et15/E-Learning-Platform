import Image from "next/image";
import logo from "@/public/elearning-logo.jpg";
import { cn } from "@/lib/utils";
import Link from "next/link";
export const Logo = ({ className = "" }) => {
  return (
    <Link href="/">
      <Image
        className={cn("max-w-[100px] max-h-[50px] rounded-full", className)}
        src={logo}
        alt="logo"
      />
    </Link>
  );
};

