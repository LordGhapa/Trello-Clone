"use client";
import { BoardContextProvider } from "@/app/context/BoardContext";
import { ColumnType, RoomProvider } from "@/app/liveblocks.config";
import { LiveList, LiveObject } from "@liveblocks/client";
import { useParams } from "next/navigation";

export default function BoardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const params = useParams();
  return (
    <BoardContextProvider>
      <RoomProvider
        id={params.boardId.toString() as string}
        initialPresence={[]}
        initialStorage={{
          columns: new LiveList(),
          cards: new LiveList(),
        }}
      >
        {children}
        {modal}
      </RoomProvider>
    </BoardContextProvider>
  );
}
