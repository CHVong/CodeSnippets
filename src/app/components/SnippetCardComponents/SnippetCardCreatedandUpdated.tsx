import moment, { MomentInput } from "moment";

type props = {
  snippet: any;
  sessionId: string;
};

export default function SnippetCardCreatedandUpdated({ snippet, sessionId }: props) {
  return (
    <div className="flex text-xs justify-between text-gray-400">
      <span>Created {moment(snippet.createdAt).format("MMM DD, YYYY")}</span>

      {sessionId === snippet.posterId ? (
        <span>Updated {moment(snippet.updatedAt).fromNow()}</span>
      ) : (
        <span>By {snippet.posterName}</span>
      )}
    </div>
  );
}
