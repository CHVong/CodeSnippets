import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Search() {
  const [search, setSearch] = useState("");
  return (
    <div className="join px-2 pb-6 animate-fadeIn">
      <div>
        <div>
          <input
            className="input  join-item w-full"
            placeholder="Title or Description ..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <button className="btn join-item">Search</button>
    </div>
  );
}
