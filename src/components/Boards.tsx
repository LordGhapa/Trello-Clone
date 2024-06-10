"use server";

import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/useClient";
import { RoomInfo } from "@liveblocks/node";
import Link from "next/link";

export default async function Boards() {
  const email = await getUserEmail();
  let rooms: RoomInfo[] = [];

  if (typeof email === "string") {
    const response = await liveblocksClient.getRooms({ userId: email });
    rooms = response.data || [];
  }

  return (
    <div className="grid gap-2 py-4 md:grid-cols-4">
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <Link
            href={`/boards/${room.id}`}
            key={room.id}
            className="rounded-md border bg-gray-200 p-4 "
          >
            {room?.metadata?.boardName}
          </Link>
        ))
      ) : (
        <p>Quadro de atividades não encontrado.</p>
      )}
    </div>
  );
}
