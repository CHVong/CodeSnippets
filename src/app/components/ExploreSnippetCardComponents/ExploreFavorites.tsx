import React from "react";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function ExploreFavorites({ snippet, sessionId }: { snippet: any; sessionId: any }) {
  const router = useRouter();
  return sessionId ? (
    <button className="btn btn-outline btn-accent btn-xs">
      <FaHeart />
      <span>{snippet.favorites}</span>
    </button>
  ) : (
    <button
      className="btn btn-outline btn-accent btn-xs"
      onClick={() => {
        router.push("/signin");
      }}
    >
      <FaHeart />
      <span>{snippet.favorites}</span>
    </button>
  );
}
