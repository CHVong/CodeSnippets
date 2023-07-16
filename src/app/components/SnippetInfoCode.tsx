"use client";

import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
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
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import SnippetInfoExpandButton from "./SnippetInfoExpandButton";
import SnippetInfoCopyButton from "./SnippetInfoCopyButton";
type Props = {
  code: string;
  language: string;
  snippet: any;
};

export default function CodeFormat({ code, language, snippet }: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, [language]);
  return (
    <pre className="w-full h-60 lg:h-full scrollbar relative">
      <div className="absolute top-0 right-0 m-4 flex gap-2">
        <SnippetInfoCopyButton snippet={snippet} />
        <SnippetInfoExpandButton snippet={snippet} />
      </div>
      <code className={`language-${language} `}>{code}</code>
    </pre>
  );
}
