"use client";

import { FaHeart, FaComment, FaTrash, FaCopy, FaCheck, FaUndo, FaExpandAlt } from "react-icons/fa";
import { useState } from "react";
import CodeFormat from "./CodeFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SnippetCardCreatedandUpdated from "./SnippetCardComponents/SnippetCardCreatedandUpdated";
import SnippetCardPublicandPrivate from "./SnippetCardComponents/SnippetCardPublicandPrivate";
import SnippetCardSetLanguage from "./SnippetCardComponents/SnippetCardSetLanguage";

export default function SnippetCards({
  snippet,
  sessionId,
}: {
  snippet: Snippet;
  sessionId: string;
}) {
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const queryClient = useQueryClient();

  async function copyCode(code: string) {
    await navigator.clipboard.writeText(code);
  }

  const deleteMutation = useMutation({
    mutationFn: deleteSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
  });

  async function deleteSnippet(snippetId: string) {
    const response = await fetch(`/api/snippets/deletesnippet/${snippet.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ snippetId: snippetId.toString() }),
    });
    if (!response.ok) {
      throw new Error("Network Error: Failed to delete snippet");
    }
    console.log("snippet deleted");
    return response.json();
  }

  return (
    <section key={snippet.id} className="p-4">
      <div className="card w-full bg-base-100 shadow-xl break-words hover:outline-blue-500 hover:outline inline-block dark:bg-gray-800 animate-fadeIn">
        <figure className="relative">
          <CodeFormat code={snippet.snippet} language={snippet.language} />
          <div className="absolute top-0 right-0 m-4 flex gap-2">
            <div className="tooltip tooltip-left " data-tip={"Copy"}>
              <button
                className="btn btn-outline btn-success btn-xs"
                onClick={() => copyCode(snippet.snippet)}
              >
                <FaCopy />
              </button>
            </div>
            <div className="tooltip tooltip-left " data-tip={"Expand"}>
              <button
                className="btn btn-outline btn-success btn-xs"
                onClick={() => {
                  if (document) {
                    (document.getElementById(snippet.id) as HTMLFormElement).showModal();
                  }
                }}
              >
                <FaExpandAlt />
              </button>
              <dialog id={snippet.id} className="modal">
                <form method="dialog" className="modal-box max-w-min scrollbar rounded-lg">
                  <p className="pb-4">Press ESC key or click outside to close</p>
                  <div className="relative">
                    <pre className="w-full h-full scrollbar rounded-lg">
                      <code className={`language-${snippet.language}`}>{snippet.snippet}</code>
                    </pre>
                    <div className="absolute top-0 right-0 m-4 flex gap-2">
                      <div className="tooltip tooltip-left " data-tip={"Copy"}>
                        <button
                          className="btn btn-outline btn-success btn-xs"
                          onClick={() => copyCode(snippet.snippet)}
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </figure>
        <div className="card-body p-5">
          <div className="flex justify-between">
            <div className=" flex gap-2">
              <button className="btn btn-outline btn-accent btn-xs">
                <FaHeart />
                <span>{snippet.favorites}</span>
              </button>
              <button
                className="btn btn-outline btn-neutral btn-xs"
                onClick={() => {
                  if (document) {
                    (document.getElementById(snippet.id) as HTMLFormElement).showModal();
                  }
                }}
              >
                <FaComment className="" />
                <span></span>
              </button>
            </div>

            {showConfirmDelete ? (
              <>
                {deleteMutation.isLoading || deleteMutation.isSuccess ? (
                  <span className="loading loading-spinner text-primary"></span>
                ) : (
                  <div className="flex gap-1">
                    <div className="tooltip tooltip-top" data-tip={"Confirm"}>
                      <button
                        className="btn btn-outline btn-success btn-xs"
                        onClick={(prev) => {
                          deleteMutation.mutate(snippet.id);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                    <div className="tooltip tooltip-top" data-tip={"Back"}>
                      <button
                        className="btn btn-outline btn-neutral btn-xs"
                        onClick={() => {
                          setShowConfirmDelete(!showConfirmDelete);
                        }}
                      >
                        <FaUndo />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="tooltip tooltip-left" data-tip={"Delete"}>
                <button
                  className="btn btn-outline btn-error btn-xs "
                  onClick={() => {
                    setShowConfirmDelete(!showConfirmDelete);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>

          <h2 className="card-title">{snippet.title}</h2>
          <p className="">{snippet.description}</p>

          <div className="card-actions justify-between items-center">
            <SnippetCardSetLanguage snippet={snippet} sessionId={sessionId} />
            <SnippetCardPublicandPrivate snippet={snippet} sessionId={sessionId} />
          </div>
          <SnippetCardCreatedandUpdated
            createdAt={snippet.createdAt}
            updatedAt={snippet.updatedAt}
          />
        </div>
      </div>
    </section>
  );
}
