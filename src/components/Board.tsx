"use client";
import { useState } from "react";
import { RoomProvider } from "@/app/liveblocks.config";
import { LiveList } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import Columns from "./Columns";

// const defaultColumns = [
//   { id: "col 1", name: "A fazer", index: 0 },
//   { id: "col 2", name: "Em progresso", index: 1 },
//   { id: "col 3", name: "Finalizado", index: 2 },
// ];


// const defaultCards: CardType[] = [
//   { id: "alal0", name: "todo1", index: 0, columnId: "col 1" },
//   { id: "alal1", name: "todo2", index: 1, columnId: "col 1" },
//   { id: "alal2", name: "em progresso 1", index: 0, columnId: "col 2" },
//   { id: "alal3", name: "em progresso 2", index: 1, columnId: "col 2" },
//   { id: "alal4", name: "finalizado 1", index: 0, columnId: "col 3" },
//   { id: "alal5", name: "finalizado 2", index: 1, columnId: "col 3" },
// ];

type BoardProps = {
  id: string;
};
export default function Board({ id }: BoardProps) {

  return (
    <RoomProvider
      id={id}
      initialPresence={{}}
      initialStorage={{
        columns: new LiveList(),
        cards: new LiveList()
      }}
    >
      <ClientSideSuspense fallback={<div>"Carregando..."</div>}>
        {() => (
          <>
            <Columns />
          </>
        )}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
