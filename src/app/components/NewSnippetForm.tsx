"use client";
import { type } from "os";
import { useState } from "react";

import dynamic from "next/dynamic";
const CodeFormatTest = dynamic(() => import("../components/CodeFormatTest"), {
  ssr: false,
});

// import CodeFormatTest from "./CodeFormatTest";
import CodeJarTest from "./CodeJarTest";

export default function NewSnippetForm() {
  const [test, setTest] = useState<boolean>(false);

  return (
    <form className="w-4/5 md:w-1/2 lg:w-1/3">
      <div className="form-control w-full font-bold">
        <label className="cursor-pointer label justify-start gap-4">
          <span className="label-text ">Public</span>
          <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" />
        </label>
        <label className="label" htmlFor="title">
          <span className="label-text ">Snippet Title</span>
        </label>
        <input
          type="text"
          id="title"
          placeholder="Title ..."
          className="input input-bordered w-full"
        />
        <label className="label" htmlFor="description">
          <span className="label-text ">Snippet Description</span>
        </label>
        <textarea
          id="description"
          className="textarea textarea-bordered"
          placeholder="Description ..."
        ></textarea>
      </div>
      <CodeFormatTest
        code={` const userArray = [ "London", "Sydney", "Madrid", "Boston", "Verona", "Rome", "Athens",
            "Porto", "Meteora", ]`}
        language={"js"}
      />
      <CodeJarTest />
    </form>
  );
}
