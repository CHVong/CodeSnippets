"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SnippetCards from "./SnippetCards";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Search from "./Search";
import Filter from "./Filter";
import ExploreSnippetCards from "./ExploreSnippetCards";

export default function ExploreSnippetsComponent() {
  const [snippets, setSnippets] = useState<null | Snippet[]>([]);
  const { data: session, status } = useSession();
  const sessionId = session?.token?.sub;
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("newest");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["snippets", sessionId],
    queryFn: getAllSnippets,
    enabled: !!sessionId,
    staleTime: 1000 * 60 * 5,
  });
  useEffect(() => {
    refetch();
  }, [page, activeTab]);
  if (isLoading) {
    return <span className="loading loading-bars loading-lg bg-primary"></span>;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  async function getAllSnippets() {
    const response = await fetch(
      `/api/getallexploresnippets/find/${activeTab}/${sessionId}/${page}/${search}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  const incrementPage = () => {
    if (page < data.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const decrementPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <div className="join px-2 pb-6 animate-fadeIn">
        <div>
          <div>
            <input
              className="input  join-item w-full"
              placeholder="Title or Description ..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  refetch();
                }
              }}
            />
          </div>
        </div>

        <button className="btn join-item" onClick={() => refetch()}>
          Search
        </button>
      </div>
      <div className="tabs pb-6 animate-fadeIn relative">
        <a
          className={`tab tab-bordered ${activeTab === "newest" && "tab-active animate-fadeIn"}`}
          onClick={() => {
            setActiveTab("newest");
          }}
        >
          Newest
        </a>
        <a
          className={`tab tab-bordered ${activeTab === "oldest" && "tab-active animate-fadeIn"}`}
          onClick={() => {
            setActiveTab("oldest");
          }}
        >
          Oldest
        </a>
        {/* <a
          className={`tab tab-bordered ${activeTab === "favorited" && "tab-active animate-fadeIn"}`}
          onClick={() => setActiveTab("favorited")}
        >
          Favorited
        </a> */}
        {isFetching && (
          <span className="loading loading-spinner loading-sm absolute top-3/4 right-1/2"></span>
        )}
      </div>

      <div className="xl:columns-4 xl:w-4/5 lg:columns-3 md:columns-2 columns-1 w-full sm:w-11/12 m-auto gap-0">
        {data.snippets.map((snippet: Snippet, i: number) => {
          return <ExploreSnippetCards key={snippet.id} snippet={snippet} sessionId={sessionId} />;
        })}
      </div>
      {data.snippets.length === 0 && data.currentPage === 1 && (
        <div className="hero-content text-center">
          <div className="max-w-md">
            <div className="alert alert-info">
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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>No snippets found!</span>
              <Link href={"/create"}>
                <button className="btn btn-sm btn-neutral">Create Snippets</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="join p-4">
        <button className="join-item btn" onClick={decrementPage}>
          «
        </button>
        <button className="join-item btn no-animation">
          Page{" "}
          {data.currentPage !== 1 && data.currentPage > data.totalPages
            ? decrementPage()
            : data.currentPage}{" "}
          of {data.totalPages > 0 ? data.totalPages : "1"}
          {isFetching && <span className="loading loading-spinner loading-xs"></span>}
        </button>
        <button className="join-item btn" onClick={incrementPage}>
          »
        </button>
      </div>
    </>
  );
}
