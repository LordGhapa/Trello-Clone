import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-gray-200 p-4 px-8">
      <div className="flex items-center justify-between ">
        <a href="/" className="logo">
          Trello-Clone
        </a>
        <div>
          {!!session === true ? (
            <>
              Ola, {session?.user?.name}
              <LogoutButton />
            </>
          ) : (
            <>
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
