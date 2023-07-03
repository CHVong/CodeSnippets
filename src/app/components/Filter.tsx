import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Filter({ page, sessionId }: { page: any; sessionId: any }) {
  const [activeTab, setActiveTab] = useState("newest");

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["snippets", sessionId],
    queryFn: getAllSnippets,
    enabled: false,
  });
  useEffect(() => {
    refetch();
  }, [activeTab]);

  async function getAllSnippets() {
    const response = await fetch(`/api/getallsnippets/${activeTab}/${sessionId}/${page}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  return (
    <div className="tabs pb-6 animate-fadeIn">
      <a
        className={`tab tab-bordered ${activeTab === "newest" && "tab-active animate-fadeIn"}`}
        onClick={() => {
          setActiveTab("newest");
        }}
      >
        Newest
      </a>
      <a
        className={`tab tab-bordered ${activeTab === "oldest" && "tab-active animate-fadeIn"}`}
        onClick={() => {
          setActiveTab("oldest");
        }}
      >
        Oldest
      </a>
      <a
        className={`tab tab-bordered ${activeTab === "favorited" && "tab-active animate-fadeIn"}`}
        onClick={() => setActiveTab("favorited")}
      >
        Favorited
      </a>
    </div>
  );
}
