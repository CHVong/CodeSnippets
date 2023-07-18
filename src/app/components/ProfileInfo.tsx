"use client";

import Image from "next/image";
import moment from "moment";
import { FaBell, FaClock, FaEnvelope, FaUser } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function ProfileInfo({ user }: any) {
  const { data, isLoading, refetch, isSuccess } = useQuery({
    queryKey: ["profileInfo"],
    queryFn: getProfileInfo,
    staleTime: 1000 * 60 * 5,
  });

  async function getProfileInfo() {
    const response = await fetch(`http://localhost:3000/api/profile/get/${user.id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  useEffect(() => {
    refetch();
  }, []);
  const username = `${user.name}#${user.id.slice(-4).toUpperCase()}`;
  return (
    <>
      <div className="avatar self-center pb-4">
        <div className="w-24 rounded-full">
          <Image src={user.image!} width={500} height={500} alt="profile pic" />
        </div>
      </div>

      <div className="max-w-sm">
        <li>
          <a
            className="tooltip flex !cursor-default relative select-text break-all"
            data-tip="Bio/Status"
          >
            <div className="relative">
              <span className="absolute -top-4 -left-3 scale-x-[-1]">💭</span>
              <span className="scale-x-[-1]">🙄</span>
            </div>

            {isLoading && <span className="loading text-blue-500 loading-ring loading-xs"></span>}
            {isSuccess ? (data?.bio ? data?.bio : "...") : ""}
          </a>
        </li>

        <li>
          <a className="tooltip flex !cursor-default select-text break-all" data-tip="Email">
            <FaEnvelope className="text-lg" />
            {user.email}
          </a>
        </li>
        <li>
          <a className="tooltip flex !cursor-default select-text break-all" data-tip="Username">
            <FaUser className="text-lg" />
            {username}
          </a>
        </li>
        <li>
          <a className="tooltip flex !cursor-default select-text" data-tip="Date Created">
            <FaClock className="text-lg" />
            {moment(user?.createdAt).format("MMM DD, YYYY")}
          </a>
        </li>
      </div>
    </>
  );
}
