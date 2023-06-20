"use client";

import { useState, useEffect } from "react";
import CodeFormatTest from "../components/CodeFormatTest";
import { FaHeart, FaComment, FaTrash, FaCopy } from "react-icons/fa";

export default function Snippets() {
  const languageFullName: { [key: string]: string } = {
    markup: "Other",
    js: "Javascript",
    java: "Java",
    python: "Python",
    php: "PHP",
    c: "C",
    cpp: "C++",
    csharp: "C#",
    css: "CSS",
    html: "HTML",
  };

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
        // console.log(snippets);
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
    <div className="columns-3 h-full p-4 m-auto">
      {snippets.length ? (
        snippets.map((snippet: Snippet, i: number) => {
          return (
            <section key={snippet.id}>
              <div className="card w-96 bg-base-100 shadow-xl break-words hover:outline-blue-500 hover:outline inline-block m-2 dark:bg-gray-800">
                <figure className="relative">
                  <CodeFormatTest code={snippet.snippet} language={snippet.language} />
                  <div className="absolute top-0 right-0 m-4">
                    <button className="btn btn-outline btn-success btn-xs">
                      <FaCopy
                        onClick={() => {
                          navigator.clipboard.writeText(snippet.snippet);
                        }}
                      />
                    </button>
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex justify-between">
                    <button className="btn btn-outline btn-primary btn-xs">
                      <FaHeart className="hover:outline-red-500" />
                    </button>

                    <button className="btn btn-outline btn-error btn-xs">
                      <FaTrash className="hover:outline-red-500" />
                    </button>
                  </div>

                  <h2 className="card-title">{snippet.title}</h2>
                  <p className="">{snippet.description}</p>
                  <div className="card-actions justify-between">
                    <div className="">
                      <button className="btn btn-outline btn-warning btn-xs">
                        <FaComment className="hover:outline-red-500" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      {snippet.isPublic ? (
                        <div className="badge badge-outline bg-green-300 dark:bg-green-800">
                          Public
                        </div>
                      ) : (
                        <div className="badge badge-outline bg-red-300 dark:bg-red-800">
                          Private
                        </div>
                      )}
                      <div className="badge badge-outline bg-secondary">
                        {languageFullName[snippet.language as string]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      ) : (
        <div className="flex h-[50vw] w-screen justify-center items-center grow p-20">
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
