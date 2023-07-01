import { useMutation, useQueryClient } from "@tanstack/react-query";
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
export default function SnippetCardSetLanguage({
  snippet,
  sessionId,
}: {
  snippet: any;
  sessionId: any;
}) {
  const queryClient = useQueryClient();

  const updateLanguageMutation = useMutation({
    mutationFn: updateLanguage,
    onSuccess: (data) => {
      queryClient.setQueryData(["snippets", sessionId], (oldData: any) => {
        const newData = [...oldData];
        const index = newData.findIndex((snippet: any) => snippet.id === data.data.id);
        newData[index] = data.data;
        return newData;
      });
    },
  });

  async function updateLanguage({ snippetId, language }: { snippetId: string; language: string }) {
    const response = await fetch(`/api/snippets/updatelanguage`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ snippetId, language }),
    });
    if (!response.ok) {
      throw new Error("Network Error: Failed to update snippet");
    }
    return response.json();
  }
  return (
    <div>
      <select
        className="select select-bordered select-xs w-full max-w-xs"
        defaultValue={""}
        onChange={(event) => {
          updateLanguageMutation.mutate({
            snippetId: snippet.id,
            language: event.target.value,
          });
        }}
      >
        <option value="" disabled>
          {languageFullName[snippet.language as string]}
        </option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="js">Javascript</option>
        <option value="java">Java</option>
        <option value="python">Python</option>
        <option value="php">PHP</option>
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="csharp">C#</option>
        <option value="markup">Other</option>
      </select>
    </div>
  );
}