"use server";
import { authOptions } from "@/lib/authOptions";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/useClient";
import { Liveblocks, RoomInfo } from "@liveblocks/node";
import { randomBytes } from "crypto";
import { getServerSession } from "next-auth";

export async function createBoard(name: string): Promise<RoomInfo | boolean> {
  // const secretKey = process.env.LIVEBLOCKS_SECRET_KEY;
  // if (!secretKey) {
  //   throw new Error("LIVEBLOCKS_SECRET_KEY não está definido");
  // }

  // const liveblocksClient = new Liveblocks({
  //   secret: secretKey,
  // });

  const roomId = randomBytes(8).toString("hex");

  const email = await getUserEmail();
  if (typeof email === "string") {
    try {
      const roomInfo = await liveblocksClient.createRoom(roomId, {
        defaultAccesses: [],
        usersAccesses: {
          [email]: ["room:write"],
        },
        metadata: {
          boardName: name,
        },
      });
      return roomInfo as RoomInfo;
    } catch (error) {
      console.error("Erro ao criar a sala:", error);
      return false;
    }
  }
  return false;
}
