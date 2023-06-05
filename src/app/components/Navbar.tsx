"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const bracketsEffect =
    "before:content-['['] after:content-[']'] before:absolute after:absolute hover:before:-left-4 hover:after:-right-4 hover:before:transition-all hover:after:transition-all before:opacity-0 after:opacity-0 before:-left-1 after:-right-1 hover:before:opacity-100 hover:after:opacity-100 hover:before:duration-500 hover:after:duration-500 relative";

  const hoverEffect =
    "transition-all duration-300 hover:text-blue-500 hover:font-bold hover:dark:text-blue-300";

  const activeLink =
    "before:content-['['] after:content-[']'] before:absolute after:absolute before:-left-4 after:-right-4 text-blue-500 dark:text-blue-300 font-bold relative";

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Explore", href: "/explore" },
    { name: "Log In", href: "/login" },
    { name: "Sign Up", href: "/signup" },
  ];

  return (
    <nav className="flex items-center justify-between xl:justify-around p-6 animate-fadeIn text-lg">
      <div>
        <Link href={"/"}>
          <Image
            src={"logo.svg"}
            height={50}
            width={50}
            alt="Navigation Logo Image"
            priority={true}
            className="transition-all hover:scale-90 duration-300"
          />
        </Link>
      </div>
      <div className="flex gap-8 items-center">
        {navLinks.map((link) => {
          const isActive = pathname.startsWith(link.href);

          return (
            <Link
              className={isActive ? `${activeLink}` : `${hoverEffect} ${bracketsEffect}`}
              href={link.href}
              key={link.name}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
