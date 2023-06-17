"use client";
import { type } from "os";
import { FormEventHandler, useState } from "react";
import { useSession } from "next-auth/react";

import dynamic from "next/dynamic";
const CodeFormatTest = dynamic(() => import("../components/CodeFormatTest"), {
  ssr: false,
});

// import CodeFormatTest from "./CodeFormatTest";
import BrowserEditor from "./BrowserEditor";

export default function NewSnippetForm() {
  const [test, setTest] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const [isPublic, setIsPublic] = useState(false);

  console.log(session?.token?.sub);
  console.log(status);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  const submitCode: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);
    payload.userId = session?.token?.sub || null;
    payload.isPublic = isPublic.toString();

    console.log(payload);

    try {
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Handle success case
        console.log("Snippet created successfully!");
      } else {
        // Handle error case
        console.error("Error creating snippet:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error creating snippet:", error);
    }
  };

  return (
    <form className="w-4/5 md:w-3/4/2 lg:w-1/2" onSubmit={submitCode}>
      <div className="form-control w-full font-bold">
        <label className="cursor-pointer label justify-start gap-4">
          <span className="label-text ">Public</span>
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
            checked={isPublic}
            onChange={handleCheckboxChange}
          />
        </label>
        <label className="label" htmlFor="title">
          <span className="label-text ">Snippet Title</span>
        </label>
        <input
          type="text"
          id="title"
          placeholder="Title ..."
          className="input input-bordered w-full"
          name="title"
          required
        />
        <label className="label" htmlFor="description">
          <span className="label-text ">Snippet Description</span>
        </label>
        <textarea
          id="description"
          className="textarea textarea-bordered"
          placeholder="Description ..."
          name="description"
          required
        ></textarea>

        <label className="label" htmlFor="codesnippet">
          <span className="label-text ">Code Snippet</span>
        </label>
        <BrowserEditor />
      </div>
      {/* <CodeFormatTest
        code={` const userArray = [ "London", "Sydney", "Madrid", "Boston", "Verona", "Rome", "Athens",
            "Porto", "Meteora", ]`}
        language={"js"}
      /> */}

      <div className="w-full text-center my-4">
        <button className="btn btn-neutral">Save</button>
      </div>
    </form>
  );
}
