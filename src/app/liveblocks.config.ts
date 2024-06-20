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
});

type Presence = {};

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
