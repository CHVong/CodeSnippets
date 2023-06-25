"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { FaBars, FaTimes } from "react-icons/fa";
import Loader from "./Loader";
import { redirect } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = true;
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();

  const bracketsEffect =
    "before:content-['['] after:content-[']'] before:absolute after:absolute hover:before:-left-4 hover:after:-right-4 hover:before:transition-all hover:after:transition-all before:opacity-0 after:opacity-0 before:-left-1 after:-right-1 hover:before:opacity-100 hover:after:opacity-100 hover:before:duration-500 hover:after:duration-500 relative ";

  const hoverEffect =
    "transition-all duration-300 hover:text-blue-500 hover:font-bold hover:dark:text-blue-400 ";

  const activeLink =
    "before:content-['['] after:content-[']'] before:absolute after:absolute before:-left-4 after:-right-4 text-blue-500 dark:text-blue-400 font-bold relative outline-none";

  const publicNavLinks = [
    { name: "About", href: "/about" },
    { name: "Explore", href: "/explore" },
    { name: "Profile", href: "/profile" },
    { name: "Protect", href: "/protect" },
    { name: "My Snippets", href: "/mysnippets" },
    { name: "Sign In", href: "/signin" },
  ];
  const privateNavLinks = [
    { name: "About", href: "/about" },
    { name: "Explore", href: "/explore" },
    { name: "Snippets", href: "/snippets" },
    { name: "My Snippets", href: "/mysnippets" },
    { name: "Create", href: "/create" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" /* || event.key === "Enter" */) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuRef]);
  // console.log(session);

  return (
    <nav className="flex items-center justify-between animate-fadeIn text-lg relative m-6 lg:w-3/4 lg:mx-auto">
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

      {session ? (
        <div className="hidden lg:flex gap-8 items-center animate-fadeIn">
          {privateNavLinks.map((link) => {
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
          <button onClick={() => signOut()} className={`${hoverEffect} ${bracketsEffect}`}>
            Sign Out
          </button>
          <Link href="/profile">
            <div className="avatar cursor-pointer w-10" onClick={() => redirect("/profile")}>
              <div className="w-24 rounded-full ring hover:ring-blue-600 ring-offset-base-100 ring-offset-2 transition duration-300">
                <Image
                  src={session?.user?.image as string}
                  alt="user image"
                  width={96}
                  height={96}
                />
              </div>
            </div>
          </Link>
        </div>
      ) : session === null ? (
        <div className="hidden lg:flex gap-8 items-center animate-fadeIn">
          {publicNavLinks.map((link) => {
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
      ) : (
        <div className="invisible lg:visible">
          <Loader />
        </div>
      )}

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
            <div
              className="z-10 absolute top-full animate-fadeIn p-8 md:p-10 border-2 border-blue-900 rounded-md w-full md:w-1/2 bg-neutral-100 dark:bg-black mt-4"
              ref={menuRef}
            >
              <div className="flex flex-col items-center justify-center relative w-max m-auto gap-2 md:gap-4">
                {session ? (
                  <>
                    <Link href="/profile">
                      <div
                        className="avatar cursor-pointer w-10"
                        onClick={() => redirect("/profile")}
                      >
                        <div className="w-24 rounded-full ring hover:ring-blue-600 ring-offset-base-100 ring-offset-2 transition duration-300">
                          <Image
                            src={session?.user?.image as string}
                            alt="user image"
                            width={96}
                            height={96}
                          />
                        </div>
                      </div>
                    </Link>
                    {privateNavLinks.map((link) => {
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
                    <button
                      onClick={() => signOut()}
                      className={`${hoverEffect} ${bracketsEffect}`}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  publicNavLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                      <Link
                        className={isActive ? `${activeLink}` : `${hoverEffect} ${bracketsEffect}`}
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
                )}
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
