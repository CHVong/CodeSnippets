"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SnippetCards from "../components/SnippetCards";

export default function Snippets() {
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

      // console.log(snippets);

      if (response.ok) {
        console.log("Snippet loaded successfully!");
        // console.log(snippets);
        const snippets = await response.json();
        setSnippets(snippets);
      } else {
        console.error("Error getting snippets:", response.status, response.statusText);
        setSnippets(null);
      }
    } catch (error) {
      console.error("Error getting snippet:", error);
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
        // Handle success case
        getAllSnippets();
        console.log("Snippet created successfully!");
      } else {
        // Handle error case
        console.error("Error deleting snippet:", response.status, response.statusText);
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
        // Handle success case
        const updatedData = await response.json();
        setSnippets((prevData: any) => {
          const newData: any = [...prevData];
          const index: number = newData.findIndex(
            (snippet: Snippet) => (snippet.id as string) === updatedData.data.id
          );
          newData[index] = updatedData.data;
          return newData;
        });
        console.log(updatedData.data.isPublic);
        // getAllSnippets();
        console.log("Public updated successfully!");
      } else {
        // Handle error case
        console.error("Error updating public snippet:", response.status, response.statusText);
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
            <SnippetCards
              key={snippet.id}
              snippet={snippet}
              sessionId={session?.token.sub}
              // deleteFunction={deleteSnippet}
              updatePublicFunction={updatePublic}
            />
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

// SSR

// import { getAllSnippets } from "../lib/getAllSnippets";

// export default async function Snippets() {
//   const snippets = await getAllSnippets();

//   return (
//     <div>
//       {snippets.length !== 0
//         ? snippets.map((snippet: Snippet, i: number) => {
//             return (
//               <section key={snippet.id}>
//                 <h2>{snippet.title}</h2>
//                 <p>{snippet.description}</p>
//                 <aside>{snippet.language}</aside>
//                 <p>{snippet.snippet}</p>
//                 <aside>{snippet.favorites}</aside>
//                 <h3>{snippet.posterId}</h3>
//                 <aside>{snippet.createdAt}</aside>
//                 <aside>{snippet.isPublic}</aside>
//               </section>
//             );
//           })
//         : "LOADING"}
//     </div>
//   );
// }
