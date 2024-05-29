import Board from "@/components/Board";
import LoginView from "@/components/views/LoginView";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Boards from "@/components/Boards";

export default async function Home() {
  const session = await getServerSession(authOptions);

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
        {/* {session && <Board />} */}
      </div>
    </>
  );
}
