import { FaComment } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import ExploreCommentModal from "./ExploreCommentModal";

export default function SnippetCardCommentsButton({ snippet }: { snippet: any }) {
  const commentKey = `${snippet.id}-comment`;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["comments", snippet.id],
    queryFn: getAllComments,
    enabled: false,
  });

  async function getAllComments() {
    const response = await fetch(`/api/snippets/getallcomments/${snippet.id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  function handleClick() {
    refetch();
  }

  return (
    <div className="tooltip tooltip-top " data-tip={"Comments"}>
      <button
        className="btn btn-outline btn-neutral btn-xs"
        onClick={() => {
          if (document) {
            (document.getElementById(commentKey) as HTMLFormElement).showModal();
          }
          handleClick();
        }}
      >
        <FaComment />
        {snippet.totalComments}
      </button>
      <dialog id={commentKey} className="modal">
        <form method="dialog" className="modal-box w-11/12 scrollbar rounded-lg ">
          <div className="flex justify-end">
            <button className="btn btn-circle btn-outline btn-error btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p className="pb-4 text-2xl font-bold">Comments</p>
          <div className="relative">
            {/* <pre className="w-full h-full scrollbar rounded-lg">
              <code className={`language-${snippet.language}`}>{snippet.snippet}</code>
            </pre> */}

            <ExploreCommentModal snippet={snippet} commentData={data} />
            <div className="absolute top-0 right-0 m-4 flex gap-2">
              {/* <SnippetCardCopyButton snippet={snippet} /> */}
            </div>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
