import { FaLink } from "react-icons/fa";

export default function SnippetCardCopyLinkButton({ snippet }: { snippet: any }) {
  function copyLink() {
    const currentUrl = window.location.origin;
    const snippetId = snippet.id;
    const linkToCopy = `${currentUrl}/snippets/${snippetId}`;
    navigator.clipboard.writeText(linkToCopy);
  }

  return (
    <div className="tooltip tooltip-left" data-tip={"Copy Link"}>
      <div
        /* Need to keep as a div instead of button element tag, 
           this will keep expand modal window open after clicking copy icon, 
           change to button if intended to close window after copy. */
        className="btn btn-outline btn-success btn-xs"
        onClick={copyLink}
      >
        <FaLink />
      </div>
    </div>
  );
}
