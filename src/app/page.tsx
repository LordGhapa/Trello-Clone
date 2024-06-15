import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Boards from "@/components/Boards";
import UserNotLogger from "@/components/UserNotLogger";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return <UserNotLogger />;

  return (
    <>
      <div>
        <h1 className="mb-4 text-4xl">Seu Quadro:</h1>
        <Boards />
        <div className="mt-4">
          <Link
            className="btn primary inline-flex items-center gap-2"
            href={"/new-board"}
          >
            Crie um novo quadro{" "}
            <FontAwesomeIcon className="size-6" icon={faArrowRight} />
          </Link>
        </div>
      </div>
    </>
  );
}
