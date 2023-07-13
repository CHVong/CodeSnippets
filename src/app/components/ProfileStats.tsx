"use client";
import { useEffect, useState } from "react";
import { FaCode, FaStream, FaGlobeAmericas, FaHeart, FaComment, FaFireAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const languageFullName: { [key: string]: string } = {
  markup: "Other",
  js: "Javascript",
  java: "Java",
  python: "Python",
  php: "PHP",
  c: "C",
  cpp: "C++",
  csharp: "C#",
  css: "CSS",
  html: "HTML",
};

type stats = {
  totalSnippets: number;
  totalComments: number;
  favorited: number;
  totalLines: number;
  publicSnippets: number;
  mostPopularLanguage: string;
};

export default function ProfileStats({ sessionId }: { sessionId: string }) {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
    staleTime: 1000 * 60 * 5,
  });

  async function getStats() {
    const response = await await fetch(`http://localhost:3000/api/profilestats/${sessionId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <span className="loading loading-bars loading-lg bg-primary"></span>
      </div>
    );
  }

  return (
    <>
      <div className="grid p-4 divide-y-[1px] lg:divide-y-4 animate-fadeIn">
        <div className="stats stats-vertical lg:stats-horizontal shadow rounded-none rounded-t-lg">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaCode className="text-2xl" />
            </div>
            <div className="stat-title">Authored</div>
            <div className="stat-value">{data?.totalSnippets}</div>
            <div className="stat-desc">code snippets</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <FaStream className="text-2xl" />
            </div>
            <div className="stat-title">Submitted</div>
            <div className="stat-value">{data?.totalLines}</div>
            <div className="stat-desc">lines of code</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <FaGlobeAmericas className="text-2xl" />
            </div>
            <div className="stat-title">Shared</div>
            <div className="stat-value">{data?.publicSnippets}</div>
            <div className="stat-desc">public snippets</div>
          </div>
        </div>

        <div className="stats stats-vertical lg:stats-horizontal shadow rounded-none rounded-b-lg">
          <div className="stat">
            <div className="stat-figure text-primary">
              <FaHeart className="text-2xl" />
            </div>
            <div className="stat-title">Favorited</div>
            <div className="stat-value">{data?.favorited}</div>
            <div className="stat-desc">code snippets</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <FaComment className="text-2xl" />
            </div>
            <div className="stat-title">Posted</div>
            <div className="stat-value">{data?.totalComments}</div>
            <div className="stat-desc">comments</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <FaFireAlt className="text-2xl" />
            </div>
            <div className="stat-title">Coded with</div>
            <div className={`stat-value ${data.mostPopularLanguage.length > 1 ? "text-lg" : ""}`}>
              {data.mostPopularLanguage.map((e: any) => languageFullName[e]).join(", ")}
            </div>
            <div className="stat-desc">most often</div>
          </div>
        </div>
      </div>
    </>
  );
}
