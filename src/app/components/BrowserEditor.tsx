"use client";

import React from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-php";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";

const hightlightWithLineNumbers = (input: any, language: any, codelanguage: any) =>
  highlight(input, language, codelanguage)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join(" \n");
export default function BrowserEditor() {
  const [code, setCode] = React.useState(
    `//Select language for syntax highlighting.\n//Enter your codes here!\n\nfunction add(a, b) {\n  return a + b;\n}`
  );

  const [codeLanguage, setCodeLanguage] = React.useState("markup");
  return (
    <div className="">
      <select
        className="select-sm select-info w-max max-w-xs mb-4 rounded-lg"
        name="language"
        required
        onChange={(event) => setCodeLanguage(event.target.value)}
        defaultValue={""}
      >
        <option value="" disabled>
          Select language
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
      <Editor
        value={code}
        onValueChange={(code) => {
          setCode(code);
          console.log(code);
        }}
        highlight={(code) =>
          hightlightWithLineNumbers(code, Prism.languages[codeLanguage], `${codeLanguage}`)
        }
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
        }}
        className="bg-slate-800 dark:bg-slate-800 border-2 border-black rounded-md text-neutral-400 editor"
        name="snippet"
        required
        textareaId="codeArea"
      />
    </div>
  );
}
