"use client";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="ml-6 inline-flex items-center gap-2 rounded-md bg-gray-400 px-4 py-2"
    >
      Logout
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  );
}
