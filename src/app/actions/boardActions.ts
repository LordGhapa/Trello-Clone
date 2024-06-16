"use server";

import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/useClient";
import { RoomAccesses, RoomInfo, RoomPermission } from "@liveblocks/node";

import uniqid from "uniqid";

export async function createBoard(name: string): Promise<RoomInfo | boolean> {
  const roomId = uniqid.time();

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

export async function addEmailAccessToBoard(boardId: string, email: string) {
  const room = await liveblocksClient.getRoom(boardId);
  const usersAccesses = room.usersAccesses;
  usersAccesses[email] = ["room:write"];

  await liveblocksClient.updateRoom(boardId, { usersAccesses });
  return true;
}

export async function removeEmailFromBoard(boardId: string, email: string) {
  const room = await liveblocksClient.getRoom(boardId);
  const usersAccesses: any = room.usersAccesses;

  if (usersAccesses) {
    //se tenta da delete usersAccesses[email] nao vao funcionar coisa própria do liveblocks
    usersAccesses[email] = null;
    await liveblocksClient.updateRoom(boardId, {
      usersAccesses: usersAccesses,
    });
  }

  return true;
}

export async function deleteBoard(boardId: string) {
  await liveblocksClient.deleteRoom(boardId);

  return true;
}
export async function updateBoardName(boardId: string, newNameBoard: string) {
  const newName = { boardName: newNameBoard };
  await liveblocksClient.updateRoom(boardId, {
    metadata: newName,
  });

  return true;
}
