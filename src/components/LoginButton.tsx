"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function LoginButton() {
  return (
    <>
      {" "}
      <button
        onClick={() => signIn("google")}
        className="primary rounded-md bg-gray-300 px-4 py-2 "
      >
        Login
      </button>
    </>
  );
}
