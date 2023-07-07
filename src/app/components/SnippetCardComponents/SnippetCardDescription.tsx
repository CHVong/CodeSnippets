import { useState } from "react";
import { FaPen, FaSave, FaUndo } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SnippetCardDescription({
  snippet,
  sessionId,
}: {
  snippet: any;
  sessionId: any;
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [description, setDescription] = useState(snippet.description);
  const queryClient = useQueryClient();

  const updateDescriptionMutation = useMutation({
    mutationFn: updateDescription,
    onSuccess: (data) => {
      queryClient.setQueryData(["snippets", sessionId], (oldData: any) => {
        const newData = oldData.snippets.map((snippet: any) => {
          if (snippet.id === data.data.id) {
            return {
              ...snippet,
              description: data.data.description,
              updatedAt: data.data.updatedAt,
            };
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

  async function updateDescription({
    snippetId,
    description,
  }: {
    snippetId: string;
    description: string;
  }) {
    const response = await fetch(`/api/snippets/updatedescription`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippetId, description }),
    });
    if (!response.ok) {
      throw new Error("Network Error: Failed to update snippet");
    }
    return response.json();
  }

  return (
    <>
      {sessionId === snippet.posterId ? (
        <div className="relative w-full">
          {updateDescriptionMutation.isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : showEdit ? (
            <>
              <textarea
                className="textarea textarea-primary scrollbar textarea-sm w-full max-w-xs"
                placeholder="Description..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>

              <div className="w-max ml-auto flex gap-1">
                <button
                  className="btn btn-outline btn-success btn-xs"
                  onClick={() => {
                    updateDescriptionMutation.mutate({
                      snippetId: snippet.id,
                      description: description,
                    });
                    setShowEdit(!showEdit);
                  }}
                >
                  <FaSave />
                </button>
                <button
                  className="btn btn-outline btn-neutral btn-xs"
                  onClick={() => setShowEdit(!showEdit)}
                >
                  <FaUndo />
                </button>
              </div>
            </>
          ) : (
            <>
              {snippet.description}
              <button className="btn btn-ghost btn-xs" onClick={() => setShowEdit(!showEdit)}>
                <FaPen />
              </button>
            </>
          )}
        </div>
      ) : (
        snippet.description
      )}
    </>
  );
}
