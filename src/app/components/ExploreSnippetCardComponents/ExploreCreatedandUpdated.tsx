import moment, { MomentInput } from "moment";

type props = {
  createdAt: MomentInput;
};

export default function SnippetCardCreatedandUpdated({ createdAt }: props) {
  return (
    <div className="flex text-xs justify-end text-gray-400">
      <span>Created {moment(createdAt).format("MMM DD, YYYY")}</span>
    </div>
  );
}
