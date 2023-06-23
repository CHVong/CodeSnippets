"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SnippetCards from "./SnippetCards";
import { redirect } from "next/navigation";

export default function MySnippetsComponent() {
  const [snippets, setSnippets] = useState<null | Snippet[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/signin");
    } else if (status === "authenticated" && session) {
      getAllSnippets();
    }
  }, [session, status]);

  async function getAllSnippets() {
    try {
      const sessionId = await session?.token.sub;
      const response = await fetch(`http://localhost:3000/api/getallsnippets/${sessionId}`, {
        cache: "no-store",
      });
      if (response.ok) {
        const snippets = await response.json();
        setSnippets(snippets);
      }
    } catch (error) {
      console.error("Error getting all snippets:", error);
      setSnippets(null);
    }
  }
  async function deleteSnippet(snippetId: string) {
    try {
      const response = await fetch("/api/snippets", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ snippetId: snippetId.toString() }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log(updatedData);
        setSnippets((prevData: Snippet[] | null) => {
          if (prevData) {
            return prevData.filter((snippet) => snippet.id !== snippetId);
          }
          return prevData;
        });
        console.log("Snippet successfully deleted!");
      }
    } catch (error) {
      console.error("Error deleting snippet:", error);
    }
  }
  async function updatePublic(snippetId: string, isPublic: boolean) {
    try {
      const response = await fetch("/api/snippets", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ snippetId: snippetId.toString(), isPublic }),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setSnippets((prevData: any) => {
          const newData: any = [...prevData];
          const index: number = newData.findIndex(
            (snippet: Snippet) => (snippet.id as string) === updatedData.data.id
          );
          newData[index] = updatedData.data;
          return newData;
        });
        console.log("Public updated successfully!");
      }
    } catch (error) {
      console.error("Error updating public snippet:", error);
    }
  }

  return (
    <div className="columns-3 h-full p-4 m-auto">
      {snippets?.length === 0 ? (
        <div /* className="flex h-[50vw] w-screen justify-center items-center grow p-20" */
          className="column-span"
        >
          <span className="loading loading-bars loading-lg bg-primary"></span>
        </div>
      ) : snippets?.length ? (
        snippets.map((snippet: Snippet, i: number) => {
          return (
            <div className="transition-all">
              <SnippetCards
                key={snippet.id}
                snippet={snippet}
                deleteFunction={deleteSnippet}
                updatePublicFunction={updatePublic}
              />
            </div>
          );
        })
      ) : (
        <div className="column-span">
          <h2>You currently do not have any snippets</h2>

          <button className="btn btn-primary">Get Started</button>
        </div>
      )}
    </div>
  );
}
