"use client";

import { FaHeart, FaComment, FaTrash, FaCopy, FaCheck, FaUndo } from "react-icons/fa";
import { useState } from "react";
import CodeFormatTest from "./CodeFormatTest";

export default function SnippetCards({
  snippet,
  deleteFunction,
}: {
  snippet: Snippet;
  deleteFunction: Function;
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
            {showLoading ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              <div className="flex gap-1">
                {showConfirmDelete ? (
                  <>
                    <button
                      className="btn btn-outline btn-success btn-xs"
                      onClick={(prev) => {
                        setShowLoading(true);
                        deleteFunction(snippet.id);
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
            )}
          </div>

          <h2 className="card-title">{snippet.title}</h2>
          <p className="">{snippet.description}</p>
          <div className="card-actions justify-between">
            <div className="">
              <button className="btn btn-outline btn-warning btn-xs">
                <FaComment className="hover:outline-red-500" />
              </button>
            </div>
            <div className="flex gap-2">
              {snippet.isPublic ? (
                <div className="badge badge-outline bg-green-300 dark:bg-green-700">Public</div>
              ) : (
                <div className="badge badge-outline bg-red-300 dark:bg-orange-700">Private</div>
              )}
              <div className="badge badge-outline bg-gray-800">
                {languageFullName[snippet.language as string]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
