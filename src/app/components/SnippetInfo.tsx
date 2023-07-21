"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaComment, FaHeart, FaLock, FaUnlock } from "react-icons/fa";
import SnippetInfoCode from "./SnippetInfoCode";
import moment from "moment";
import { Session } from "next-auth";
import Image from "next/image";
import SnippetCardExpandButton from "./SnippetCardComponents/SnippetCardExpandButton";
import SnippetInfoExpandButton from "./SnippetInfoExpandButton";
import Link from "next/link";

export default function SnippetInfo({ param, session }: { param: string; session: Session }) {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["snippetinfo"],
    queryFn: getSnippetInfo,
    staleTime: 1000 * 60 * 5,
  });

  async function getSnippetInfo() {
    const response = await await fetch(`/api/snippets/snippetinfo/${param}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <span className="loading loading-bars loading-lg bg-primary"></span>
      </div>
    );
  }
  console.log(data);
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
  const username = `${session?.user.name}#${session?.token.sub.slice(-4).toUpperCase()}`;
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl w-11/12 md:w-3/5 lg:w-max h-full lg:h-[30rem] rounded-lg">
      <figure className="h-full w-full relative">
        <SnippetInfoCode code={data?.snippet!} language={data?.language!} snippet={data} />
      </figure>
      <div className="card-body w-full lg:max-w-lg scrollbar overflow-auto h-full">
        <div className="text-xs text-gray-400 text-end">
          Created by{" "}
          <Link href={`${window.location.origin}/profile/${data.posterId}`} className="underline">
            {data.posterName}
          </Link>{" "}
          on {moment(data.createdAt).format("MMM DD, YYYY")}
        </div>
        <h2 className="card-title">{data?.title}</h2>
        <p>{data?.description}</p>

        <div>
          <p className="text-center font-bold underline">
            {data.totalComments} Total Comment{data.totalComments > 1 ? "s" : ""}
          </p>
          {data.comments.map((comment: any, index: any) => {
            const isCurrentUser = comment.commenterName === username;
            const isSameUser = comment.commenterId === data.comments[index - 1]?.commenterId;
            const chatClass = isCurrentUser
              ? "chat-end"
              : isSameUser
              ? data.comments[index - 1]?.chatClass
              : "chat-start";

            comment.chatClass = chatClass;
            return (
              <div className={`chat ${chatClass} animate-fadeIn`} key={comment.id}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Link href={`${window.location.origin}/profile/${comment.commenterId}`}>
                      <Image
                        src={`${comment?.user?.image}`}
                        alt="User image"
                        width={96}
                        height={96}
                      />
                    </Link>
                  </div>
                </div>
                <div className="chat-header">
                  <Link href={`${window.location.origin}/profile/${comment.commenterId}`}>
                    <span>{comment.commenterName}</span>
                  </Link>{" "}
                  <time className="text-xs opacity-50">
                    {/* {moment(commentData.createdAt).format("MMM DD, YYYY h:mm A")} */}
                    {moment(comment.createdAt).fromNow()}
                  </time>
                </div>
                <div className="chat-bubble">{comment.comment}</div>
              </div>
            );
          })}{" "}
          <div className="flex items-center justify-end gap-1 pt-6">
            <button className="btn btn-accent no-animation btn-xs cursor-default">
              <FaHeart />
              <span>{data.favorites.length}</span>
            </button>
            <button className="btn btn-primary no-animation btn-xs cursor-default">
              <span>{languageFullName[data.language as string]}</span>
            </button>

            {data.isPublic ? (
              <>
                <button className="btn btn-success no-animation btn-xs cursor-default">
                  <FaUnlock />
                  <span>Public</span>
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-error no-animation btn-xs cursor-default">
                  <FaLock />
                  <span>Private</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
