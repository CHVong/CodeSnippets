import { useState } from "react";
import { FaUndo, FaTrash, FaCheck } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function SnippetCardDelete({
  snippet,
  sessionId,
}: {
  snippet: any;
  sessionId: any;
}) {
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteSnippet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
    },
  });

  async function deleteSnippet(snippetId: string) {
    const response = await fetch(`/api/snippets/deletesnippet/${snippet.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ snippetId: snippetId.toString() }),
    });
    if (!response.ok) {
      throw new Error("Network Error: Failed to delete snippet");
    }
    console.log("snippet deleted");
    return response.json();
  }

  return (
    <>
      {sessionId === snippet.posterId ? (
        showConfirmDelete ? (
          <>
            {deleteMutation.isLoading || deleteMutation.isSuccess ? (
              <span className="loading loading-spinner text-primary"></span>
            ) : (
              <div className="flex gap-1">
                <div className="tooltip tooltip-top" data-tip={"Confirm"}>
                  <button
                    className="btn btn-outline btn-success btn-xs"
                    onClick={(prev) => {
                      deleteMutation.mutate(snippet.id);
                    }}
                  >
                    <FaCheck />
                  </button>
                </div>
                <div className="tooltip tooltip-top" data-tip={"Back"}>
                  <button
                    className="btn btn-outline btn-neutral btn-xs"
                    onClick={() => {
                      setShowConfirmDelete(!showConfirmDelete);
                    }}
                  >
                    <FaUndo />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="tooltip tooltip-left" data-tip={"Delete"}>
            <button
              className="btn btn-outline btn-error btn-xs "
              onClick={() => {
                setShowConfirmDelete(!showConfirmDelete);
              }}
            >
              <FaTrash />
            </button>
          </div>
        )
      ) : (
        ""
      )}
    </>
  );
}
