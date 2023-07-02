import React from "react";
import PageTitle from "../components/PageTitle";
import ExploreSnippetsComponent from "../components/ExploreSnippetsComponent";

export const metadata = {
  title: "Code Snippets | Explore",
};

export default function Explore() {
  return (
    <main className="flex flex-col items-center justify-center">
      <PageTitle title={"Explore"} />
      <ExploreSnippetsComponent />
    </main>
  );
}
