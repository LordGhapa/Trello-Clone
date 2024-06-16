"use client";

import { CardType, useMutation } from "@/app/liveblocks.config";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LiveObject } from "@liveblocks/client";
import { FormEvent, useState } from "react";
import uniqid from "uniqid";

export default function NewCardForm({ columnId }: { columnId: string }) {
  const [createMode, setCreateMode] = useState(false);
  const addCard = useMutation(
    ({ storage }, cardName) => {
      return storage.get("cards").push(
        new LiveObject<CardType>({
          name: cardName,
          id: uniqid.time(),
          columnId: columnId,
          index: 9999,
        }),
      );
    },
    [columnId],
  );

  function handleNewCard(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (input?.value.trim().length === 0) return;
    if (input) {
      const cardName = input?.value.trim();
      addCard(cardName);
      input.value = "";
    }
  }

  return (
    <form className="max-w-xs" onSubmit={handleNewCard}>
      <label className=" block">
        <input type="text" placeholder="Novo cartão" />
  
      </label>
    </form>
  );
}
