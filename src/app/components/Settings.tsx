"use client";

import { useRouter } from "next/navigation";
import { FaCog, FaExclamationTriangle, FaUndo } from "react-icons/fa";

export default function Settings() {
  const router = useRouter();
  return (
    <div className="dropdown dropdown-bottom dropdown-end self-end tooltip" data-tip="Settings">
      <label tabIndex={0} className="btn btn-sm m-1">
        <FaCog />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            className="ring-2 text-red-400 ring-red-400 hover:!bg-error hover:ring-0"
            onClick={() => {
              if (document) {
                (document.getElementById("delete") as HTMLFormElement).showModal();
              }
            }}
          >
            <FaExclamationTriangle />
            Delete Account
          </button>
        </li>
      </ul>
      <dialog id="delete" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">DELETING YOUR ACCOUNT!</h3>
          <p className="py-4">
            All of your data will be wiped <span className="font-bold">PERMANENTLY</span>.
            <br />
            Are you sure you want to <span className="font-bold">DELETE</span>?
          </p>
          <div className="flex gap-2 justify-center">
            <div
              className="btn btn-outline btn-error"
              onClick={() => {
                console.log("hello");
                router.push("/");
              }}
            >
              <FaExclamationTriangle />
              DELETE
            </div>

            <button className="btn btn-outline">
              <FaUndo />
              BACK
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
