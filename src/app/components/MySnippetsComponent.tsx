"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SnippetCards from "./SnippetCards";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function MySnippetsComponent() {
  const [snippets, setSnippets] = useState<null | Snippet[]>([]);
  const { data: session, status } = useSession();
  const sessionId = session?.token?.sub;
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["snippets", sessionId],
    queryFn: getAllSnippets,
    enabled: !!sessionId,
  });
  useEffect(() => {
    refetch();
  }, [page]);
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
    const response = await fetch(`/api/getallsnippets/${sessionId}/${page}`);
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
      {/* <div className="join">
        <div>
          <div>
            <input className="input input-bordered join-item" placeholder="Search..." />
          </div>
        </div>
        <select className="select select-bordered join-item">
          <option disabled selected>
            Filter
          </option>
          <option>Sci-fi</option>
          <option>Drama</option>
          <option>Action</option>
        </select>
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">new</span>
          <button className="btn join-item">Search</button>
        </div>
      </div> */}
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
