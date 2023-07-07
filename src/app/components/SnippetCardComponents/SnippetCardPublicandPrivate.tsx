import { FaUnlock, FaLock } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SnippetCardPublicandPrivate({
  snippet,
  sessionId,
}: {
  snippet: any;
  sessionId: any;
}) {
  const queryClient = useQueryClient();

  const updatePublicMutation = useMutation({
    mutationFn: updatePublic,
    onSuccess: (data) => {
      queryClient.setQueryData(["snippets", sessionId], (oldData: any) => {
        const newData = oldData.snippets.map((snippet: any) => {
          if (snippet.id === data.data.id) {
            return { ...snippet, isPublic: data.data.isPublic, updatedAt: data.data.updatedAt };
          }
          return snippet;
        });
        return {
          ...oldData,
          snippets: newData,
        };
      });
    },
  });

  async function updatePublic({ snippetId, isPublic }: { snippetId: string; isPublic: boolean }) {
    const response = await fetch(`/api/snippets`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippetId: snippetId.toString(), isPublic }),
    });
    if (!response.ok) {
      throw new Error("Network Error: Failed to update snippet");
    }
    return response.json();
  }

  return (
    <div className="flex gap-2">
      {sessionId === snippet.posterId ? (
        <div
          className={`tooltip tooltip-left flex gap-2 items-center`}
          data-tip={`${snippet.isPublic ? "Public" : "Private"} `}
        >
          {snippet.isPublic ? (
            <FaUnlock className="text-neutral" />
          ) : (
            <FaLock className="text-neutral" />
          )}
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-sm"
            defaultChecked={snippet.isPublic}
            onClick={() => {
              updatePublicMutation.mutate({
                snippetId: snippet.id,
                isPublic: snippet.isPublic,
              });
            }}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
