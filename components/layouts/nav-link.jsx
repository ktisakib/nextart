"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLink = ({ href, title, className, props }) => {
  const path = usePathname();
  return (
    <Link {...props} className={cn(path == href && " bg-yellow-100 dark:bg-stone-900 ", className)} href={href}>
      {title}
    </Link>
  );
};

export default NavLink;
