"use client";

import { FaHeart, FaComment } from "react-icons/fa";
import CodeFormat from "./CodeFormat";
import SnippetCardCreatedandUpdated from "./SnippetCardComponents/SnippetCardCreatedandUpdated";
import SnippetCardPublicandPrivate from "./SnippetCardComponents/SnippetCardPublicandPrivate";
import SnippetCardSetLanguage from "./SnippetCardComponents/SnippetCardSetLanguage";
import SnippetCardDelete from "./SnippetCardComponents/SnippetCardDelete";
import SnippetCardCopyButton from "./SnippetCardComponents/SnippetCardCopyButton";
import SnippetCardExpandButton from "./SnippetCardComponents/SnippetCardExpandButton";
import SnippetCardCommentsButton from "./SnippetCardComponents/SnippetCardCommentsButton";
import SnippetCardTitle from "./SnippetCardComponents/SnippetCardTitle";
import SnippetCardDescription from "./SnippetCardComponents/SnippetCardDescription";
import SnippetCardFavorites from "./SnippetCardComponents/SnippetCardFavorites";
import SnippetCardCopyLinkButton from "./SnippetCardComponents/SnippetCardCopyLinkButton";

export default function SnippetCards({
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
            <SnippetCardCopyLinkButton snippet={snippet} />
            <SnippetCardCopyButton snippet={snippet} />
            <SnippetCardExpandButton snippet={snippet} />
          </div>
        </figure>
        <div className="card-body p-5">
          <div className="flex justify-between">
            <div className=" flex gap-2">
              <SnippetCardFavorites snippet={snippet} sessionId={sessionId} />
              <SnippetCardCommentsButton snippet={snippet} />
            </div>
            <SnippetCardDelete snippet={snippet} sessionId={sessionId} />
          </div>

          <h2 className="card-title">
            <SnippetCardTitle snippet={snippet} sessionId={sessionId} />
          </h2>
          <h3 className="">
            <SnippetCardDescription snippet={snippet} sessionId={sessionId} />
          </h3>

          <div className="card-actions justify-between items-center">
            <SnippetCardSetLanguage snippet={snippet} sessionId={sessionId} />
            <SnippetCardPublicandPrivate snippet={snippet} sessionId={sessionId} />
          </div>
          <SnippetCardCreatedandUpdated snippet={snippet} sessionId={sessionId} />
        </div>
      </div>
    </section>
  );
}
