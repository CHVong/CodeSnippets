import React from "react";
import { FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SnippetCardFavorites({
  snippet,
  sessionId,
}: {
  snippet: any;
  sessionId: any;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  // console.log(sessionId);
  const addFavoriteMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: (data) => {
      queryClient.setQueryData(["snippets", sessionId], (oldData: any) => {
        // console.log(oldData);
        // console.log(data);
        const newData = oldData.snippets.map((snippet: any) => {
          if (snippet.id === data.id) {
            return { ...snippet, favorites: data.favorites };
          } else return snippet;
        });
        return { ...oldData, snippets: newData };
      });
      // console.log("successfully favorited a comment");
    },
  });

  async function addFavorite() {
    const payload = {
      codeSnippetId: snippet.id,
      sessionId: sessionId,
    };
    const response = await fetch("/api/snippets/favorite", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Network Error: Failed to add a comment");
    }
    // console.log("Favorited successfully!");
    return response.json();
  }

  return sessionId ? (
    <button
      className={`btn ${
        snippet.favorites.includes(sessionId) ? "" : "btn-outline"
      } btn-accent btn-xs`}
      onClick={() => {
        addFavoriteMutation.mutate();
      }}
    >
      <FaHeart />
      <span>{snippet.favorites.length}</span>
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
