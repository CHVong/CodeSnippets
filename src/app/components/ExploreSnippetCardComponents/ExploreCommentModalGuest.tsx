import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FaPaperPlane } from "react-icons/fa";
import moment from "moment";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SnippetCardCommentsModal({
  snippet,
  commentData,
}: {
  snippet: any;
  commentData: any;
}) {
  const [comment, setComment] = useState("");
  const [newest, setNewest] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const reversedCommentData = commentData?.slice().reverse();

  return (
    <div className="">
      <div className="flex gap-4 items-end justify-between">
        <div className="avatar block">
          <div className="w-10 rounded-full">
            <FaUserCircle className="w-full h-full" />
          </div>
        </div>
        <span>
          {commentData?.length} Total Comment{commentData?.length > 1 ? "s" : ""}
        </span>
      </div>
      <div className="py-2">
        <textarea
          placeholder="Leave a message..."
          className="textarea textarea-primary textarea-sm w-full "
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></textarea>
      </div>
      {errorMessage && (
        <div className="alert alert-error mb-2 gap-2 md:gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
      <div
        className="btn btn-outline btn-sm"
        onClick={() => {
          if (comment.trim() !== "") {
            setErrorMessage("");
            router.push("/signin");
          } else {
            return setErrorMessage("Comments cannot be left blank!");
          }
        }}
      >
        Submit
        <FaPaperPlane />
      </div>
      <div className="tabs py-4 justify-center">
        <a
          className={`tab tab-bordered ${newest ? "tab-active animate-fadeIn" : ""}`}
          onClick={() => setNewest(true)}
        >
          Newest
        </a>
        <a
          className={`tab tab-bordered ${newest ? "" : "tab-active animate-fadeIn"}`}
          onClick={() => setNewest(false)}
        >
          Oldest
        </a>
      </div>

      {commentData?.length && newest ? (
        commentData.map((comment: any, index: any) => {
          const isFirstMessage = index === 0;
          const isSameUser = comment.commenterId === commentData[index - 1]?.commenterId;
          const chatClass = isFirstMessage
            ? "chat-start"
            : isSameUser
            ? commentData[index - 1]?.chatClass
            : commentData[index - 1]?.chatClass === "chat-start"
            ? "chat-end"
            : "chat-start";

          comment.chatClass = chatClass;
          return (
            <div className={`chat ${chatClass} animate-fadeIn`} key={comment.id}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Link href={`${window.location.origin}/profile/${comment.commenterId}`}>
                    <Image
                      src={`${comment.commenterImage}`}
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
                  {/* {moment(commentData.createdAt).format("MMM DD, YYYY h:mm A")} */}{" "}
                  {moment(comment.createdAt).fromNow()}
                </time>
              </div>
              <div className="chat-bubble">{comment.comment}</div>
            </div>
          );
        })
      ) : commentData?.length && newest === false ? (
        reversedCommentData.map((comment: any, index: any) => {
          const isFirstMessage = index === 0;
          const nextComment = reversedCommentData[index + 1]; // Get the next comment in the reversed array

          // If there is no next comment, set isSameUser to false
          const isSameUser = nextComment ? comment.commenterId === nextComment.commenterId : false;

          let chatClass;
          if (isFirstMessage) {
            chatClass = "chat-start";
          } else {
            const prevComment = reversedCommentData[index - 1]; // Get the previous comment in the reversed array

            // If previous and current comment have the same user, continue with the same class as the previous comment
            if (prevComment && comment.commenterId === prevComment.commenterId) {
              chatClass = prevComment.chatClass;
            } else {
              // If different user, switch the class from "chat-start" to "chat-end" or vice versa
              chatClass = prevComment?.chatClass === "chat-start" ? "chat-end" : "chat-start";
            }
          }

          comment.chatClass = chatClass;
          return (
            <div className={`chat ${chatClass} animate-fadeIn`} key={comment.id}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Link href={`${window.location.origin}/profile/${comment.commenterId}`}>
                    <Image
                      src={`${comment.commenterImage}`}
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
                  {/* {moment(commentData.createdAt).format("MMM DD, YYYY h:mm A")} */}{" "}
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
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
}
