"use client";
import { CardType, useMutation, useStorage } from "@/app/liveblocks.config";
import { ReactSortable } from "react-sortablejs";
import { shallow } from "@liveblocks/client";
import NewCardForm from "./forms/NewCardForm";
import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faEllipsis,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

type ColumnsProps = {
  id: string;
  name: string;
};

export default function Column({ id, name }: ColumnsProps) {
  const [renameMode, setRenameMode] = useState(false);
  const route = useRouter();

  const columnCards = useStorage<CardType[]>((root) => {
    return root.cards
      .filter((c) => c.columnId === id)
      .map((c) => ({ ...c }))
      .sort((a, b) => a.index - b.index);
  }, shallow);

  const updateCard = useMutation(({ storage }, index, updateData) => {
    const card = storage?.get("cards")?.get(index);
    if (card) {
      for (let key in updateData) {
        card?.set(key as keyof CardType, updateData[key]);
      }
    }
  }, []);

  const setTaskOrderForColumn = useMutation(
    ({ storage }, sortedCards: CardType[], newColumnId) => {
      const idsOfSortedCards = sortedCards.map((card) => card.id.toString());
      const allCards = [...storage.get("cards").map((card) => card.toObject())];

      idsOfSortedCards.forEach((sortedCardId, colIndex) => {
        const cardStorageIndex = allCards.findIndex(
          (c) => c.id.toString() === sortedCardId,
        );
        updateCard(cardStorageIndex, {
          columnId: newColumnId,
          index: colIndex,
        });
      });
    },
    [],
  );

  const handleDeleteColumn = useMutation(({ storage }, id) => {
    const columns = storage.get("columns");
    const columnIndex = columns.findIndex((c) => c.toObject().id === id);
    columns.delete(columnIndex);
  }, []);

  const updateColumn = useMutation(({ storage }, id, newName) => {
    const columns = storage.get("columns");
    columns.find((c) => c.toObject().id === id)?.set("name", newName);
  }, []);

  const handleNameSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (input?.value.trim().length === 0) return;

    if (input) {
      updateColumn(id, input.value.trim());
      setRenameMode(false);
    }
    route.refresh();
  };

  return (
    <div className="w-48 rounded-md bg-white p-2 shadow-sm ">
      {!renameMode && (
        <div className="mb-2 flex justify-between border-b-2 border-gray-300">
          <h3 className="  text-ellipsis font-bold">{name}</h3>
          <button
            onClick={() => setRenameMode(true)}
            className="text-gray-400  hover:text-black"
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      )}
      {renameMode && (
        <div className="mb-8">
          Editar nome:
          <form onSubmit={handleNameSubmit} className="mb-2">
            <input autoFocus type="text" defaultValue={name} />
            <button type="submit" className="mt-2 w-full">
              Salvar
            </button>
          </form>
          <button
            onClick={() => handleDeleteColumn(id)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-red-500 p-2 text-white"
          >
            <FontAwesomeIcon icon={faTrash} /> Apagar coluna
          </button>
          <button
            onClick={() => setRenameMode(false)}
            className="mt-4 flex w-full items-center justify-center gap-2  text-sm font-bold uppercase text-gray-400"
          >
            <FontAwesomeIcon icon={faClose} />
            Sair
          </button>
        </div>
      )}
      {!renameMode && <NewCardForm columnId={id} />}
      {columnCards && (
        <>
          <ReactSortable
            animation={200}
            easing="ease-out"
            className="h-full"
            ghostClass="ghostClass"
            list={columnCards}
            setList={(items) => setTaskOrderForColumn(items, id)}
            group={"cards"}
          >
            {!renameMode &&
              columnCards.map((card: CardType) => (
                <div
                  key={card.id}
                  className="my-2 rounded-md border bg-white p-4"
                >
                  <span>{card.name}</span>
                </div>
              ))}
          </ReactSortable>
        </>
      )}
    </div>
  );
}
