"use client";
import { type } from "os";
import { FormEventHandler, useState } from "react";
import { useSession } from "next-auth/react";
import BrowserEditor from "./BrowserEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";

export default function NewSnippetForm() {
  const { data: session, status } = useSession();
  const [isPublic, setIsPublic] = useState(false);
  const queryClient = useQueryClient();

  // console.log(session?.token?.sub);
  // console.log(status);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked);
  };

  const username = `${session?.user.name}#${session?.token.sub.slice(-4).toUpperCase()}`;

  async function submitCode(event: any) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData);
    payload.posterId = session?.token?.sub || null;
    payload.isPublic = isPublic.toString();
    payload.posterName = username;

    const response = await fetch("/api/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Network Error: Failed to create snippet");
    }
    console.log("Snippet created successfully!");
    return response;
  }

  const createSnippetMutation = useMutation({
    mutationFn: submitCode,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["snippets"] });
      console.log("Success");
    },
  });
  // const submitCode: FormEventHandler<HTMLFormElement> = async (event) => {
  //   event.preventDefault();

  //   const form = event.target as HTMLFormElement;
  //   const formData = new FormData(form);
  //   const payload = Object.fromEntries(formData);
  //   payload.posterId = session?.token?.sub || null;
  //   payload.isPublic = isPublic.toString();

  //   console.log(payload);

  //   try {
  //     const response = await fetch("/api/snippets", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (response.ok) {
  //       // Handle success case
  //       console.log("Snippet created successfully!");
  //     } else {
  //       // Handle error case
  //       console.error("Error creating snippet:", response.status, response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error creating snippet:", error);
  //   }
  // };

  return (
    <form
      className="w-4/5 md:w-3/4/2 lg:w-1/2 animate-fadeIn"
      onSubmit={createSnippetMutation.mutate}
    >
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
      <div className="w-full text-center my-4">
        {createSnippetMutation.isSuccess && (
          <div className="alert alert-success animate-fadeIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Your snippet has been saved!</span>
          </div>
        )}
        <br />
        <button className="btn btn-neutral">
          Save
          {createSnippetMutation.isLoading ? (
            <span className="loading loading-spinner text-primary loading-xs self-center animate-fadeIn"></span>
          ) : (
            <FaPlus className="animate-fadeIn" />
          )}
        </button>
      </div>
    </form>
  );
}
