import { LiveList, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

export type ColumnType = {
  name: string;
  id: string;
  index: number;
};
export type CardType = {
  name: string;
  id: string;
  index: number;
  columnId: string;
};

type UserMeta = {
  id: string;
  info: {
    name: string;
    email: string;
    image: string;
  };
};

type RoomEvent = {};

type ThreadMetadata = {
  cardId: string;
};

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 100,
  resolveUsers: async ({ userIds }) => {
    const params = new URLSearchParams(userIds.map((id) => ["ids", id]));
    const res = await fetch(`/api/users?` + params.toString());
    return await res.json();
  },
  resolveMentionSuggestions: async ({ text }) => {
    const response = await fetch(`/api/users?search=` + text);
    const users = await response.json();
    return users.map((user: UserMeta) => user.id);
  },
});

export type Presence = {
  boardId?: null | string;
  cardId?: null | string;
};

type Storage = {
  columns: LiveList<LiveObject<ColumnType>>;
  cards: LiveList<LiveObject<CardType>>;
};

export const {
  useUpdateMyPresence,
  useRoom,
  useSelf,
  useOthers,
  useThreads,
  RoomProvider,
  useMyPresence,
  useStorage,
  useMutation,
  /* ...all the other hooks you’re using... */
} = createRoomContext<
  Presence,
  Storage,
  UserMeta,
  RoomEvent,
  ThreadMetadata
  /* UserMeta, RoomEvent, ThreadMetadata */
>(client);
