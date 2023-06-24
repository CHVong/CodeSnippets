"use client";

import { FaHeart, FaComment, FaTrash, FaCopy, FaCheck, FaUndo } from "react-icons/fa";
import { useState } from "react";
import CodeFormatTest from "./CodeFormatTest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SnippetCards({
  snippet,
  updatePublicFunction,
  sessionId,
}: {
  snippet: Snippet;
  updatePublicFunction: Function;
  sessionId: string;
}) {
  const languageFullName: { [key: string]: string } = {
    markup: "Other",
    js: "Javascript",
    java: "Java",
    python: "Python",
    php: "PHP",
    c: "C",
    cpp: "C++",
    csharp: "C#",
    css: "CSS",
    html: "HTML",
  };

  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  async function copyCode(code: string) {
    await navigator.clipboard.writeText(code);
  }
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
  });

  async function deleteSnippet(snippetId: string) {
    const response = await fetch(`/api/snippets`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippetId: snippetId.toString() }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  return (
    <section key={snippet.id}>
      <div className="card w-96 bg-base-100 shadow-xl break-words hover:outline-blue-500 hover:outline inline-block m-2 dark:bg-gray-800 animate-fadeIn">
        <figure className="relative">
          <CodeFormatTest code={snippet.snippet} language={snippet.language} />
          <div className="absolute top-0 right-0 m-4">
            <button
              className="btn btn-outline btn-success btn-xs"
              //   onClick={() => {
              //     navigator.clipboard.writeText(snippet.snippet);
              //   }}
              onClick={() => copyCode(snippet.snippet)}
            >
              <FaCopy />
            </button>
          </div>
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <button className="btn btn-outline btn-primary btn-xs">
              <FaHeart />
            </button>
            {showConfirmDelete ? (
              <>
                {deleteMutation.isLoading || deleteMutation.isSuccess ? (
                  <span className="loading loading-spinner text-primary"></span>
                ) : (
                  <>
                    <button
                      className="btn btn-outline btn-success btn-xs"
                      onClick={(prev) => {
                        setShowLoading(true);
                        deleteMutation.mutate(snippet.id);
                      }}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="btn btn-outline btn-error btn-xs"
                      onClick={() => {
                        setShowConfirmDelete(!showConfirmDelete);
                      }}
                    >
                      <FaUndo />
                    </button>
                  </>
                )}
              </>
            ) : (
              <button
                className="btn btn-outline btn-error btn-xs"
                onClick={() => {
                  setShowConfirmDelete(!showConfirmDelete);
                }}
              >
                <FaTrash />
              </button>
            )}
            {/* {showLoading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              <div className="flex gap-1">
                {showConfirmDelete ? (
                  <>
                    <button
                      className="btn btn-outline btn-success btn-xs"
                      onClick={(prev) => {
                        setShowLoading(true);
                        // deleteFunction(snippet.id);
                        deleteMutation.mutate(snippet.id);
                      }}
                    >
                      <FaCheck />
                    </button>
                    <button
                      className="btn btn-outline btn-error btn-xs"
                      onClick={() => {
                        setShowConfirmDelete(!showConfirmDelete);
                      }}
                    >
                      <FaUndo />
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-outline btn-error btn-xs"
                    onClick={() => {
                      setShowConfirmDelete(!showConfirmDelete);
                    }}
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            )} */}
          </div>

          <h2 className="card-title">{snippet.title}</h2>
          <p className="">{snippet.description}</p>
          <div className="card-actions justify-between">
            <div className="">
              <button className="btn btn-outline btn-neutral btn-xs">
                <FaComment className="" />
              </button>
            </div>
            <div className="flex gap-2  ">
              {snippet.isPublic ? (
                <div
                  className="swap swap-flip"
                  onClick={() => updatePublicFunction(snippet.id, snippet.isPublic)}
                >
                  <button className="btn btn-xs btn-outline btn-primary cursor-pointer swap-off">
                    Public
                  </button>
                  <button
                    className="btn btn-xs btn-outline btn-error cursor-pointer swap-on"
                    // onClick={() => updatePublicFunction(snippet.id, snippet.isPublic)}
                  >
                    Private
                  </button>
                </div>
              ) : (
                <div
                  className="swap swap-flip"
                  onClick={() => updatePublicFunction(snippet.id, snippet.isPublic)}
                >
                  <button className="btn btn-xs btn-outline btn-primary cursor-pointer swap-on">
                    Public
                  </button>
                  <button
                    className="btn btn-xs btn-outline btn-error cursor-pointer swap-off"
                    // onClick={() => updatePublicFunction(snippet.id, snippet.isPublic)}
                  >
                    Private
                  </button>
                </div>
              )}
              <button className="btn btn-xs btn-outline cursor-pointer">
                {languageFullName[snippet.language as string]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
