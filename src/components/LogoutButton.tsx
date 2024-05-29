"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="ml-6 rounded-md bg-gray-400 px-4 py-2"
    >
      Logout
    </button>
  );
}
