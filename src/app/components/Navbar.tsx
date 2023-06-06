"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  const bracketsEffect =
    "before:content-['['] after:content-[']'] before:absolute after:absolute hover:before:-left-4 hover:after:-right-4 hover:before:transition-all hover:after:transition-all before:opacity-0 after:opacity-0 before:-left-1 after:-right-1 hover:before:opacity-100 hover:after:opacity-100 hover:before:duration-500 hover:after:duration-500 relative";

  const hoverEffect =
    "transition-all duration-300 hover:text-blue-500 hover:font-bold hover:dark:text-blue-300";

  const activeLink =
    "before:content-['['] after:content-[']'] before:absolute after:absolute before:-left-4 after:-right-4 text-blue-500 dark:text-blue-300 font-bold relative";

  const publicNavLinks = [
    { name: "About", href: "/about" },
    { name: "Explore", href: "/explore" },
    { name: "Sign In", href: "/signin" },
  ];
  const privateNavLinks = [
    { name: "About", href: "/about" },
    { name: "Explore", href: "/explore" },
    { name: "Sign Out", href: "/signout" },
    { name: "Profile", href: "/profile" },
  ];

  const isLoggedIn = false;

  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between xl:justify-around  animate-fadeIn text-lg relative m-6">
      <div>
        <Link href={"/"}>
          <Image
            src={"logo.svg"}
            height={50}
            width={50}
            alt="Navigation Logo Image"
            priority={true}
            className="transition-all hover:scale-90 duration-300"
            onClick={() => {
              setShowMenu(false);
            }}
          />
        </Link>
      </div>
      <div className="hidden lg:flex gap-8 items-center">
        {isLoggedIn
          ? privateNavLinks.map((link) => {
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
            })
          : publicNavLinks.map((link) => {
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

      {/* MOBILE NAV */}

      <div className="lg:hidden flex flex-col items-end">
        {showMenu ? (
          <>
            <FaTimes
              className="cursor-pointer text-3xl text-blue-900"
              onClick={() => {
                setShowMenu((prev) => !prev);
              }}
            />
            <div className="z-10 absolute top-full animate-fadeIn p-10 border-2 border-blue-900 rounded-md w-full bg-neutral-100 dark:bg-black mt-4">
              <div className="flex flex-col items-center justify-center relative w-max m-auto">
                {isLoggedIn
                  ? privateNavLinks.map((link) => {
                      const isActive = pathname.startsWith(link.href);
                      return (
                        <Link
                          className={
                            isActive ? `${activeLink}` : `${hoverEffect} ${bracketsEffect}`
                          }
                          href={link.href}
                          key={link.name}
                          onClick={() => {
                            setShowMenu((prev) => !prev);
                          }}
                        >
                          {link.name}
                        </Link>
                      );
                    })
                  : publicNavLinks.map((link) => {
                      const isActive = pathname.startsWith(link.href);
                      return (
                        <Link
                          className={
                            isActive ? `${activeLink}` : `${hoverEffect} ${bracketsEffect}`
                          }
                          href={link.href}
                          key={link.name}
                          onClick={() => {
                            setShowMenu((prev) => !prev);
                          }}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
              </div>
            </div>
          </>
        ) : (
          <FaBars
            className="cursor-pointer text-3xl text-blue-900"
            onClick={() => {
              setShowMenu((prev) => !prev);
            }}
          />
        )}
      </div>
    </nav>
  );
}
