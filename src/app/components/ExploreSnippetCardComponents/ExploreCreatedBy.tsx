type props = {
  posterName: string;
};

export default function SnippetCardCreatedandUpdated({ posterName }: props) {
  return (
    <div className="flex text-xs justify-end text-gray-400">
      <span>By {posterName}</span>
    </div>
  );
}
