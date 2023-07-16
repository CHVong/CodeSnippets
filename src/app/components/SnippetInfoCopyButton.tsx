import { FaCopy } from "react-icons/fa";
export default function SnippetCopyButton({ snippet }: { snippet: any }) {
  function copyCode(code: string) {
    navigator.clipboard.writeText(code);
  }
  return (
    <div className="tooltip tooltip-left" data-tip={"Copy"}>
      <div /* Need to keep as a div instead of button element tag, this will keep expand modal window open after clicking copy icon, change to button if intended to close window after copy. */
        className="btn btn-outline btn-success btn-xs"
        onClick={() => copyCode(snippet.snippet)}
      >
        <FaCopy />
      </div>
    </div>
  );
}
