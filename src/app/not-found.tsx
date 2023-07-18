"use client"; // Error components must be Client Components

import Link from "next/link";
import PageTitle from "./components/PageTitle";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center p-4">
      <PageTitle title={"Error 404!"} />
      <div className="alert alert-error max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>The page you are trying to access does not exist!</span>
      </div>
      <div>
        <Link href={"/"}>
          <button className="btn btn-secondary m-4">Back Home</button>
        </Link>

        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => window.location.reload()
          }
          className="btn btn-neutral m-4"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
