import Link from "next/link";

type props = {
  posterName: string;
  posterId: string;
};

export default function SnippetCardCreatedandUpdated({ posterName, posterId }: props) {
  return (
    <div className="flex text-xs justify-end text-gray-400">
      <span>
        By{" "}
        <Link href={`${window.location.origin}/profile/${posterId}`} className="underline">
          {posterName}
        </Link>
      </span>
    </div>
  );
}
