"use client";
import { useState } from "react";
import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

type BoardProps = {
  id: string;
  name: string;
};
export default function Board({ id, name }: BoardProps) {
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
                <h1 className="text-2xl">Quadro de Atividades: {name}</h1>
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
