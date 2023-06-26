"use client";

import {
  FaHeart,
  FaComment,
  FaTrash,
  FaCopy,
  FaCheck,
  FaUndo,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { useState } from "react";
import CodeFormatTest from "./CodeFormatTest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SnippetCards({
  snippet,
  // updatePublicFunction,
  sessionId,
}: {
  snippet: Snippet;
  // updatePublicFunction: any;
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

  const updatePublicMutation = useMutation({
    mutationFn: updatePublic,
    onSuccess: (data) => {
      queryClient.setQueryData(["snippets", sessionId], (oldData: any) => {
        const newData = [...oldData];
        const index = newData.findIndex((snippet: any) => snippet.id === data.data.id);
        newData[index] = data.data;
        return newData;
      });
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
      throw new Error("Network Error: Failed to delete snippet");
    }
    return response.json();
  }

  async function updatePublic({ snippetId, isPublic }: { snippetId: string; isPublic: boolean }) {
    const response = await fetch(`/api/snippets`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippetId: snippetId.toString(), isPublic }),
    });
    if (!response.ok) {
      throw new Error("Network Error: Failed to update snippet");
    }
    return response.json();
  }

  return (
    <section key={snippet.id}>
      <div className="card w-96 bg-base-100 shadow-xl break-words hover:outline-blue-500 hover:outline inline-block m-2 dark:bg-gray-800 animate-fadeIn">
        <figure className="relative">
          <CodeFormatTest code={snippet.snippet} language={snippet.language} />
          <div className="absolute top-0 right-0 m-4 tooltip tooltip-left" data-tip={"Copy"}>
            <button
              className="btn btn-outline btn-success btn-xs"
              onClick={() => copyCode(snippet.snippet)}
            >
              <FaCopy />
            </button>
          </div>
        </figure>
        <div className="card-body">
          <div className="flex justify-between">
            <div className=" flex gap-2">
              <button className="btn btn-outline btn-accent btn-xs">
                <FaHeart />
              </button>
              <button className="btn btn-outline btn-neutral btn-xs">
                <FaComment className="" />
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
                          setShowLoading(true);
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

          <div className="card-actions justify-between items-end">
            <div>
              <button className="btn btn-xs btn-outline cursor-pointer">
                {languageFullName[snippet.language as string]}
              </button>
            </div>
            <div className="flex gap-2  ">
              {/* {snippet.isPublic ? (
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
              )} */}
              {/* <div
                className={`tooltip ${
                  snippet.isPublic ? "tooltip-success" : "tooltip-neutral"
                } tooltip-open tooltip-left flex`}
                data-tip={`${snippet.isPublic ? "Public" : "Private"} `}
              >
                <input
                  type="checkbox"
                  className="toggle toggle-success toggle-sm"
                  defaultChecked={snippet.isPublic}
                  onClick={() => {
                    updatePublicMutation.mutate({
                      snippetId: snippet.id,
                      isPublic: snippet.isPublic,
                    });
                  }}
                />
              </div> */}
              <div
                className={`tooltip tooltip-left flex gap-2 items-center`}
                data-tip={`${snippet.isPublic ? "Public" : "Private"} `}
              >
                {snippet.isPublic ? (
                  <FaUnlock className="text-neutral" />
                ) : (
                  <FaLock className="text-neutral" />
                )}
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  defaultChecked={snippet.isPublic}
                  onClick={() => {
                    updatePublicMutation.mutate({
                      snippetId: snippet.id,
                      isPublic: snippet.isPublic,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
