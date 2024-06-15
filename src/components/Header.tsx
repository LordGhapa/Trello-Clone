import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-gray-200 p-4 px-8">
      <div className="flex items-center justify-between ">
        <Link href="/" className="logo">
          Trello-Clone
        </Link>
        <div>
          {!!session === true ? (
            <>
              <span title={session.user?.email ?? ""}>
                Ola, {session?.user?.name}
              </span>
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
