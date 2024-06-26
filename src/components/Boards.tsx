"use server";

import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/useClient";
import { RoomInfo } from "@liveblocks/node";

import BoardsTiles from "./BoardsTiles";

export default async function Boards() {
  const email = await getUserEmail();
  let rooms: RoomInfo[] = [];

  if (typeof email === "string") {
    const response = await liveblocksClient.getRooms({ userId: email });
    rooms = response.data || [];
  }

  return <BoardsTiles boards={rooms} />;
}
