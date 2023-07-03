"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SnippetCards from "./SnippetCards";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Search from "./Search";
import Filter from "./Filter";

export default function MySnippetsComponent() {
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

  if (data.length === 0) {
    return (
      <div className="hero-content text-center">
        <div className="max-w-md">
          <p className="py-6">
            You currently do not have any saved snippets!
            <br />
            Check back here after you've created one.
          </p>
          <Link href={"/create"}>
            <button className="btn btn-sm btn-primary">Create Snippets</button>
          </Link>
        </div>
      </div>
    );
  }

  async function getAllSnippets() {
    const response = await fetch(
      `/api/getallsnippets/find/${activeTab}/${sessionId}/${page}/${search}`
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
        <a
          className={`tab tab-bordered ${activeTab === "favorited" && "tab-active animate-fadeIn"}`}
          onClick={() => setActiveTab("favorited")}
        >
          Favorited
        </a>
        {isFetching && (
          <span className="loading loading-spinner loading-sm absolute top-3/4 right-1/2"></span>
        )}
      </div>

      <div className="xl:columns-4 xl:w-4/5 lg:columns-3 md:columns-2 columns-1 w-full sm:w-11/12 m-auto gap-0">
        {data.snippets.map((snippet: Snippet, i: number) => {
          return <SnippetCards key={snippet.id} snippet={snippet} sessionId={sessionId} />;
        })}
      </div>
      <div className="join p-4">
        <button className="join-item btn" onClick={decrementPage}>
          «
        </button>
        <button className="join-item btn no-animation">
          Page {data.currentPage} of {data.totalPages}
          {isFetching && <span className="loading loading-spinner loading-xs"></span>}
        </button>
        <button className="join-item btn" onClick={incrementPage}>
          »
        </button>
      </div>
    </>
  );
}
