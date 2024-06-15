import Image from "next/image";
import logo from "@/public/assets/lws_logo.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";
export const Logo = ({ className = "" }) => {
  return (
    <Link href="/">
      <Image className={cn("max-w-[100px]", className)} src={logo} alt="logo" />
    </Link>
  );
};

