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

type Props = {
  code: string;
  language: string;
};

export default function ModalCodePreview({ code, language }: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, [language]);
  return (
    <pre className="w-full h-full scrollbar rounded-lg">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
}
