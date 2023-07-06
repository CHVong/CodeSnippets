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
export default function SnippetCardSetLanguage({ snippet }: { snippet: any }) {
  return (
    <div>
      <div className="badge badge-info font-bold">
        {languageFullName[snippet.language as string]}
      </div>
    </div>
  );
}
