"use client";

import { FaHeart, FaComment } from "react-icons/fa";
import CodeFormat from "./CodeFormat";
import SnippetCardCopyButton from "./SnippetCardComponents/SnippetCardCopyButton";
import SnippetCardExpandButton from "./SnippetCardComponents/SnippetCardExpandButton";
import ExploreCreatedandUpdated from "./ExploreSnippetCardComponents/ExploreCreatedandUpdated";
import ExploreLanguage from "./ExploreSnippetCardComponents/ExploreLanguage";
import ExploreCommentButtonLoggedIn from "./ExploreSnippetCardComponents/ExploreCommentButton";
import ExploreCommentButtonGuest from "./ExploreSnippetCardComponents/ExploreCommentButtonGuest";

export default function ExploreSnippetCards({
  snippet,
  sessionId,
}: {
  snippet: Snippet;
  sessionId: string;
}) {
  return (
    <section key={snippet.id} className="p-4">
      <div className="card w-full bg-base-100 shadow-xl break-words hover:outline-blue-500 hover:outline inline-block dark:bg-gray-800 animate-fadeIn">
        <figure className="relative">
          <CodeFormat code={snippet.snippet} language={snippet.language} />
          <div className="absolute top-0 right-0 m-4 flex gap-2">
            <SnippetCardCopyButton snippet={snippet} />
            <SnippetCardExpandButton snippet={snippet} />
          </div>
        </figure>
        <div className="card-body p-5">
          <div className="flex justify-between">
            <div className=" flex gap-2">
              <button className="btn btn-outline btn-accent btn-xs">
                <FaHeart />
                <span>{snippet.favorites}</span>
              </button>
              {sessionId ? (
                <ExploreCommentButtonLoggedIn snippet={snippet} />
              ) : (
                <ExploreCommentButtonGuest snippet={snippet} />
              )}
            </div>
            <ExploreLanguage snippet={snippet} />
          </div>

          <h2 className="card-title">{snippet.title}</h2>
          <h3 className="">{snippet.description}</h3>

          <div className="card-actions justify-end items-center">
            <ExploreCreatedandUpdated createdAt={snippet.createdAt} />
          </div>
        </div>
      </div>
    </section>
  );
}
