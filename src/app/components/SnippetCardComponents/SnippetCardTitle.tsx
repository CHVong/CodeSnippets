import { useState } from "react";
import { FaPen, FaSave, FaUndo } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SnippetCardTitle({ snippet, sessionId }: { snippet: any; sessionId: any }) {
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState(snippet.title);
  const queryClient = useQueryClient();

  const updateTitleMutation = useMutation({
    mutationFn: updateTitle,
    onSuccess: (data) => {
      queryClient.setQueryData(["snippets", sessionId], (oldData: any) => {
        const newData = oldData.snippets.map((snippet: any) => {
          if (snippet.id === data.data.id) {
            return { ...snippet, title: data.data.title, updatedAt: data.data.updatedAt };
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

  async function updateTitle({ snippetId, title }: { snippetId: string; title: string }) {
    const response = await fetch(`/api/snippets/updatetitle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippetId, title }),
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
          {updateTitleMutation.isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : showEdit ? (
            <>
              <textarea
                className="textarea textarea-primary scrollbar textarea-sm w-full max-w-xs"
                placeholder="Title..."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></textarea>

              <div className="w-max ml-auto flex gap-1">
                <button
                  className="btn btn-outline btn-success btn-xs"
                  onClick={() => {
                    updateTitleMutation.mutate({
                      snippetId: snippet.id,
                      title: title,
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
              {snippet.title}
              <button className="btn btn-ghost btn-xs" onClick={() => setShowEdit(!showEdit)}>
                <FaPen />
              </button>
            </>
          )}
        </div>
      ) : (
        snippet.title
      )}
    </>
  );
}
