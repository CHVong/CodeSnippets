import moment, { MomentInput } from "moment";

type props = {
  createdAt: MomentInput;
  updatedAt: MomentInput;
};

export default function SnippetCardCreatedandUpdated({ createdAt, updatedAt }: props) {
  return (
    <div className="flex text-xs justify-between text-gray-400">
      <span>Created {moment(createdAt).format("MMM DD, YYYY")}</span>
      <span>Updated {moment(updatedAt).fromNow()}</span>
    </div>
  );
}
