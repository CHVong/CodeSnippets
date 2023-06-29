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
  FaExpandAlt,
} from "react-icons/fa";
import { useState } from "react";
import CodeFormat from "./CodeFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

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

  const updateLanguageMutation = useMutation({
    mutationFn: updateLanguage,
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
  async function updateLanguage({ snippetId, language }: { snippetId: string; language: string }) {
    const response = await fetch(`/api/snippets/updatelanguage`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippetId, language }),
    });
    if (!response.ok) {
      throw new Error("Network Error: Failed to update snippet");
    }
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
            <div>
              <select
                className="select select-bordered select-xs w-full max-w-xs"
                defaultValue={""}
                onChange={(event) => {
                  updateLanguageMutation.mutate({
                    snippetId: snippet.id,
                    language: event.target.value,
                  });
                }}
              >
                <option value="" disabled>
                  {languageFullName[snippet.language as string]}
                </option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="js">Javascript</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="php">PHP</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
                <option value="markup">Other</option>
              </select>
            </div>

            <div className="flex gap-2">
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
          <div className="flex text-xs justify-between text-gray-400">
            <span>Created {moment(snippet.createdAt).format("MMM DD, YYYY")}</span>
            <span>Updated {moment(snippet.updatedAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
