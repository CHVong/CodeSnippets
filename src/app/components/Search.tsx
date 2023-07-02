import React from "react";
import { FaFilter } from "react-icons/fa";

export default function Search() {
  return (
    <div className="join px-2 pb-6 animate-fadeIn">
      <div>
        <div>
          <input className="input  join-item w-full" placeholder="Search..." />
        </div>
      </div>

      <button className="btn join-item">Search</button>
    </div>
  );
}
