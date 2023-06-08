import React from "react";
import PageTitle from "../components/PageTitle";

export const metadata = {
  title: "Code Snippets | Profile",
};

export default function Profile() {
  return (
    <main className="flex flex-col items-center justify-center">
      <PageTitle title={"Profile"} />
    </main>
  );
}
