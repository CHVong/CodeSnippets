"use client";

import { useState, useEffect } from "react";
import CodeFormatTest from "../components/CodeFormatTest";

export default function Snippets() {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    getAllSnippets();
  }, []);

  async function getAllSnippets() {
    try {
      const response = await fetch("http://localhost:3000/api/getallsnippets", {
        cache: "no-store",
      });
      const snippets = await response.json();
      // console.log(snippets);

      if (response.ok) {
        console.log("Snippet loaded successfully!");
        console.log(snippets);
        setSnippets(snippets);
      } else {
        console.error("Error getting snippets:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error getting snippet:", error);
    }
  }
  // const snippets = await getAllSnippets();

  return (
    <div>
      {snippets.length ? (
        snippets.map((snippet: Snippet, i: number) => {
          return (
            <section key={snippet.id}>
              <h2>{snippet.title}</h2>
              <p>{snippet.description}</p>
              <aside>{snippet.language}</aside>
              <p>{snippet.snippet}</p>
              <aside>{snippet.favorites}</aside>
              <h3>{snippet.posterId}</h3>
              <aside>{snippet.createdAt}</aside>
              <aside>{snippet.isPublic}</aside>
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="h-96 overflow-hidden">
                  <CodeFormatTest code={snippet.snippet} language={snippet.language} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    Shoes!
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      ) : (
        <div className="flex h-[50vw] justify-center items-center grow p-20">
          <span className="loading loading-bars loading-lg bg-blue-800 dark:bg-blue-500"></span>
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
