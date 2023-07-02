import { FaComment } from "react-icons/fa";
import SnippetCardCommentsModal from "./SnippetCardCommentsModal";
import { useQuery } from "@tanstack/react-query";

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
          <p className="pb-4 text-2xl font-bold">Comments</p>
          <div className="relative">
            {/* <pre className="w-full h-full scrollbar rounded-lg">
              <code className={`language-${snippet.language}`}>{snippet.snippet}</code>
            </pre> */}
            <SnippetCardCommentsModal snippet={snippet} commentData={data} />
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
