import { FaExpandAlt } from "react-icons/fa";
import SnippetCardCopyButton from "./SnippetCardComponents/SnippetCardCopyButton";

export default function SnippetCardExpandButton({ snippet }: { snippet: any }) {
  return (
    <div className="tooltip tooltip-left" data-tip={"Expand"}>
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
          <p className="pb-4 text-2xl font-bold">Snippet</p>
          <div className="relative">
            <pre className="w-full h-full scrollbar rounded-lg line-numbers">
              <code className={`language-${snippet.language}`}>{snippet.snippet}</code>
            </pre>
            <div className="absolute top-0 right-0 m-4 flex gap-2">
              <SnippetCardCopyButton snippet={snippet} />
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
