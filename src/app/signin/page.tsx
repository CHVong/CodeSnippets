import React from "react";
import PageTitle from "../components/PageTitle";

export const metadata = {
  title: "Code Snippets | Sign In",
};

export default function SignIn() {
  return (
    <main className="flex flex-col items-center justify-center">
      <PageTitle title={"Sign In"} />
    </main>
  );
}
