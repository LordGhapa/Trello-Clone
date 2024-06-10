"use client";

import { CardType, useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from "uniqid";



export default function NewCardForm({ columnId }: { columnId: string }) {

  const addCard = useMutation(({ storage }, cardName) => {
    return storage.get("cards").push(
      new LiveObject<CardType>({
        name: cardName,
        id: uniqid.time(),
        columnId: columnId,
        index:9999
      }),
    );
  }, [columnId]);

  function handleNewCard(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (input) {
      const cardName = input?.value;
      addCard(cardName);
      input.value = "";
    }
  }

  return (
    <form className="max-w-xs" onSubmit={handleNewCard}>
      <label htmlFor="" className="block  ">
        <span className="block text-gray-600">Nome do cartão</span>
        <input type="text" name="" id="" placeholder="Nova Coluna" />
      </label>
      <button type="submit" className="mt-2 block w-full">
        Criar coluna
      </button>
    </form>
  );
}
