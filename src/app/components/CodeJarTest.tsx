"use client";

import React from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css"; //Example style, you can use another

export default function CodeJarTest() {
  const [code, setCode] = React.useState(`function add(a, b) {\n  return a + b;\n}`);
  return (
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
    />
  );
}
