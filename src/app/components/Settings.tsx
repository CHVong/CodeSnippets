"use client";

import { useRouter } from "next/navigation";
import { FaCog, FaExclamationTriangle, FaUndo, FaPencilAlt, FaSave } from "react-icons/fa";
import { signOut } from "next-auth/react";

export default function Settings() {
  const router = useRouter();
  return (
    <div className="dropdown dropdown-bottom dropdown-end self-end tooltip" data-tip="Settings">
      <label tabIndex={0} className="btn btn-sm m-1">
        <FaCog />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 gap-2"
      >
        <li>
          <button
            className=""
            onClick={() => {
              if (document) {
                (document.getElementById("biostatus") as HTMLFormElement).showModal();
              }
            }}
          >
            <FaPencilAlt />
            Bio/Status
          </button>
        </li>
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
              onClick={async () => {
                console.log("hello");
                router.push((await signOut({ redirect: false, callbackUrl: "/" })).url);
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
      {/* EDIT BIO/STATUS */}
      <dialog id="biostatus" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg pb-4">Edit Your Bio/Status</h3>
          <textarea className="textarea textarea-primary" placeholder="Bio"></textarea>

          <p className="py-4">
            Include a bio or share your current status.
            <br />
            This will be displayed to the <span className="font-bold">PUBLIC</span>.
          </p>
          <div className="flex gap-2 justify-center">
            <div
              className="btn btn-outline btn-success"
              // onClick={async () => {
              //   console.log("hello");
              //   router.push((await signOut({ redirect: false, callbackUrl: "/" })).url);
              // }}
            >
              <FaSave />
              SAVE
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
