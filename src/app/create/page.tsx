import PageTitle from "../components/PageTitle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export const metadata = {
  title: "Code Snippets | Create",
};

export default async function Create() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <PageTitle title={"Create New Snippet"} />

      <form className="w-4/5 md:w-1/2 lg:w-1/3">
        <div className="form-control w-full font-bold">
          <label className="cursor-pointer label justify-start gap-4">
            <span className="label-text ">Public</span>
            <input type="checkbox" className="checkbox checkbox-primary" />
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
      </form>
    </main>
  );
}
