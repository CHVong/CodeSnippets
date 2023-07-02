import React from "react";

export default function Filter() {
  return (
    <div className="tabs pb-6 animate-fadeIn">
      <a className="tab tab-bordered tab-active">Newest</a>
      <a className="tab tab-bordered ">Oldest</a>
      <a className="tab tab-bordered">Favorited</a>
    </div>
  );
}
