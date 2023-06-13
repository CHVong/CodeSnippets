"use client";

import React from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another

export default function BrowserEditor() {
  const [code, setCode] = React.useState(
    `//Select language for syntax highlighting. \n//Enter your codes here! \n\nfunction add(a, b) {\n  return a + b;\n}`
  );
  return (
    <div className="">
      <select className="select select-info w-max max-w-xs mb-4" name="language">
        <option disabled selected>
          Select language
        </option>
        <option>HTML</option>
        <option>CSS</option>
        <option>Javascript</option>
        <option>Java</option>
        <option>Python</option>
        <option>PHP</option>
        <option>C</option>
        <option>C++</option>
        <option>C#</option>
      </select>
      <Editor
        value={code}
        onValueChange={(code) => {
          setCode(code);
          console.log(code);
        }}
        highlight={(code) => highlight(code, Prism.languages.js, "js")}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
        }}
        className="bg-blue-100 border-2 border-black rounded-md"
        name="snippet"
      />
    </div>
  );
}
