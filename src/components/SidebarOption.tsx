"use client";

import Link from "next/link";
import classnames from "classnames"; // cn
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  text: string;
};

export default function SidebarOption({ href, text }: Props) {
  const pathname = usePathname();

  return (
    <Link
      className={classnames("sidebar-option", {
        "sidebar-option--selected": pathname === href,
      })}
      href={href}
    >
      {text}
    </Link>
  );
}
