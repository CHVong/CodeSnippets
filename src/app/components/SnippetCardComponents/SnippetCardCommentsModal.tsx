import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import moment from "moment";

export default function SnippetCardCommentsModal({
  snippet,
  commentData,
}: {
  snippet: any;
  commentData: any;
}) {
  const [comment, setComment] = useState("");
  const [newest, setNewest] = useState(true);
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const username = `${session?.user.name}#${session?.token.sub.slice(-4).toUpperCase()}`;
  console.log(commentData);
  const createCommentMutation = useMutation({
    mutationFn: submitComment,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["comments", snippet.id] });
      queryClient.invalidateQueries({ queryKey: ["snippets", session?.token.sub] });
      // temporary refetch, inefficient, can go back and only fetch per changed snippet.
      queryClient.setQueryData(["comments", snippet.id], (oldData: any) => {
        console.log(oldData);
        const newData = [data, ...oldData];
        return newData;
      });
      console.log("successfully submitted a comment");
    },
  });

  async function submitComment(event: any) {
    event.preventDefault();
    const payload = {
      codeSnippetId: snippet.id,
      commenterId: session?.token.sub,
      commenterName: username,
      comment: comment,
    };
    const response = await fetch("/api/snippets/addcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Network Error: Failed to add a comment");
    }
    console.log("Snippet created successfully!");
    setComment("");
    return response.json();
  }

  return (
    <div className="">
      <div className="flex gap-4 items-end justify-between">
        <div className="avatar block">
          <div className="w-12 rounded-full">
            <Image src={`${session?.user.image}`} alt="User image" width={96} height={96} />
          </div>
        </div>
        <span>{commentData?.length} Total Comments</span>
      </div>
      <div className="py-2">
        <textarea
          placeholder="Leave a message..."
          className="textarea textarea-primary textarea-sm w-full "
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></textarea>
      </div>

      <div className="btn btn-outline btn-sm" onClick={createCommentMutation.mutate}>
        Submit
        <FaPaperPlane />
      </div>
      <div className="tabs py-4 justify-center">
        <a
          className={`tab tab-bordered ${newest ? "tab-active" : ""}`}
          onClick={() => setNewest(!newest)}
        >
          Newest
        </a>
        <a
          className={`tab tab-bordered ${newest ? "" : "tab-active"}`}
          onClick={() => setNewest(!newest)}
        >
          Oldest
        </a>
      </div>

      {commentData?.length && newest ? (
        commentData.map((comment: any, index: any) => {
          if (
            index % 2 === 0 ||
            comment.commenterName === username ||
            comment[index - 1].commenterName === comment[index].commenterName
          ) {
            return (
              <div className="chat chat-end" key={comment.id}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src={`${comment.commenterImage}`}
                      alt="User image"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <span>{comment.commenterName}</span>
                  <time className="text-xs opacity-50">
                    {/* {moment(commentData.createdAt).format("MMM DD, YYYY h:mm A")} */}
                    {moment(comment.createdAt).fromNow()}
                  </time>
                </div>
                <div className="chat-bubble">{comment.comment}</div>
              </div>
            );
          } else
            return (
              <div className="chat chat-start" key={comment.id}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src={`${comment.commenterImage}`}
                      alt="User image"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <span>{comment.commenterName}</span>
                  <time className="text-xs opacity-50">
                    {/* {moment(commentData.createdAt).format("MMM DD, YYYY h:mm A")} */}
                    {moment(comment.createdAt).fromNow()}
                  </time>
                </div>
                <div className="chat-bubble">{comment.comment}</div>
              </div>
            );
        })
      ) : commentData?.length && !newest ? (
        [...commentData].reverse().map((comment: any, index: any) => {
          if (
            index % 2 === 0 ||
            comment.commenterName === username ||
            comment[index - 1].commenterName === comment[index].commenterName
          ) {
            return (
              <div className="chat chat-end" key={comment.id}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src={`${comment.commenterImage}`}
                      alt="User image"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <span>{comment.commenterName}</span>
                  <time className="text-xs opacity-50">
                    {/* {moment(commentData.createdAt).format("MMM DD, YYYY h:mm A")} */}
                    {moment(comment.createdAt).fromNow()}
                  </time>
                </div>
                <div className="chat-bubble">{comment.comment}</div>
              </div>
            );
          } else
            return (
              <div className="chat chat-start" key={comment.id}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src={`${comment.commenterImage}`}
                      alt="User image"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <span>{comment.commenterName}</span>
                  <time className="text-xs opacity-50">
                    {/* {moment(commentData.createdAt).format("MMM DD, YYYY h:mm A")} */}
                    {moment(comment.createdAt).fromNow()}
                  </time>
                </div>
                <div className="chat-bubble">{comment.comment}</div>
              </div>
            );
        })
      ) : commentData?.length === 0 ? (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>There are no comments for this snippet</span>
        </div>
      ) : (
        <span className="loading loading-spinner text-info"></span>
      )}
    </div>
  );
}
