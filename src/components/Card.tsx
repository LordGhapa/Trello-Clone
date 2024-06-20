"use client";
import { useBoardContext } from "@/app/context/BoardContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type CardProps = {
  id: string;
  name: string;
};
export default function Card({ id, name }: CardProps) {
  const params = useParams();
  const router = useRouter();
  const { openCard } = useBoardContext();

  useEffect(() => {
    if (params.cardId && !openCard) {
      const { boardId, cardId } = params;

      router.push(`/boards/${boardId}`);
      router.push(`/boards/${boardId}/cards/${cardId}`);
    }
  }, [params.cardId]);

  return (
    <Link
      href={`/boards/${params.boardId}/cards/${id}`}
      className="my-2 block rounded-md border bg-white p-4"
    >
      <span>{name}</span>
    </Link>
  );
}
