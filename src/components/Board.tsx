"use client";
import { FormEvent, useState } from "react";
import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { updateBoardName } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";
import { BoardContextProvider } from "@/app/context/BoardContext";

type BoardProps = {
  id: string;
  name: string;
};
export default function Board({ id, name }: BoardProps) {
  const [renameMode, setRenameMode] = useState(false);
  const route = useRouter();

  const handleNameSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (input?.value.trim().length === 0) return;

    if (input) {
      await updateBoardName(id, input.value);
      setRenameMode(false);
    }
    route.refresh();
  };
  return (
    
      <RoomProvider
        id={id}
        initialPresence={{}}
        initialStorage={{
          columns: new LiveList(),
          cards: new LiveList(),
        }}
      >
        <ClientSideSuspense fallback={<div>"Carregando..."</div>}>
          {() => (
            <>
              <div className="mb-4 flex items-center justify-between gap-2">
                <div>
                  {!renameMode && (
                    <h1
                      className="cursor-pointer text-2xl"
                      onClick={() => setRenameMode(true)}
                    >
                      Quadro de Atividades: {name}
                    </h1>
                  )}
                  {renameMode && (
                    <form onSubmit={handleNameSubmit}>
                      <input
                        type="text"
                        autoFocus
                        defaultValue={name}
                        onBlur={() => setRenameMode(false)}
                      />
                    </form>
                  )}
                </div>
                <Link
                  className="btn flex items-center gap-2"
                  href={`/boards/${id}/settings`}
                >
                  <FontAwesomeIcon icon={faCog} />
                  Configurações
                </Link>
              </div>
              <Columns />
            </>
          )}
        </ClientSideSuspense>
      </RoomProvider>
    
  );
}
