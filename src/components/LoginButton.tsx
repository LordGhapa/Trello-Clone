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
        Faça Login
      </button>
    </>
    // <button
    //   onClick={() => signIn("google")}
    //   className="ml-6 bg-gray-400 px-4 py-2"
    // >
    //   Login
    // </button>
  );
}
