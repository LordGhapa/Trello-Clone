import {
  CardType,
  useMutation,
  useStorage,
  useThreads,
} from "@/app/liveblocks.config";
import {  faEllipsis, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import DeleteWithConfirmation from "./DeleteWithConfirmation";
import CancelButton from "./CancelButton";
import { Thread } from "@liveblocks/react-comments";
import { Composer } from "@liveblocks/react-comments";
import { useBoardContext } from "@/app/context/BoardContext";
import { shallow } from "@liveblocks/client";
import CardDescription from "./CardDescription";
import "@liveblocks/react-comments/styles.css";

export default function CardModalBody() {
  const router = useRouter();
  const params = useParams();
  const { threads } = useThreads({
    query: {
      metadata: {
        cardId: params.cardId.toString(),
      },
    },
  });
  const { setOpenCard } = useBoardContext();
  const [editMode, setEditMode] = useState(false);

  const card = useStorage((root) => {
    return root.cards.find((c) => c.id === params.cardId);
  }, shallow);

  const updateCard = useMutation(({ storage }, cardId, updateData) => {
    const cards = storage.get("cards").map((c) => c.toObject());
    const index = cards.findIndex((c) => c.id === cardId);
    const card = storage.get("cards").get(index);
    for (let updateKey in updateData) {
      card?.set(updateKey as keyof CardType, updateData[updateKey]);
    }
  }, []);

  const deleteCard = useMutation(({ storage }, id) => {
    const cards = storage.get("cards");
    const cardIndex = cards.findIndex((c) => c.toObject().id === id);
    cards.delete(cardIndex);
  }, []);

  useEffect(() => {
    if (params.cardId && setOpenCard) {
      setOpenCard(params.cardId.toString());
    }
  }, [params]);

  function handleDelete() {
    deleteCard(params.cardId);
    if (setOpenCard) {
      setOpenCard(null);
    }
    router.back();
  }

  function handleNameChangeSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (input) {
      const newName = input.value.trim();
      updateCard(params.cardId, { name: newName });
      setEditMode(false);
    }
  }

  return (
    <>
      {!editMode && (
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">{card?.name}</h4>
          <button className="text-gray-400" onClick={() => setEditMode(true)}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
      )}
      {editMode && (
        <div>
          <form onSubmit={handleNameChangeSubmit}>
            <input type="text" defaultValue={card?.name} className="my-2" />
            <button type="submit" className="w-full">
              Salvar
            </button>
          </form>
          <div className="mt-2">
            <DeleteWithConfirmation onDelete={() => handleDelete()} />
          </div>
          <CancelButton onClick={() => setEditMode(false)} />
        </div>
      )}
      {!editMode && (
        <div>
          <h2 className="mt-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faFileLines} />
            Descrição
          </h2>
          <CardDescription />
          <h2 className="mt-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faComments} />
            Comentários
          </h2>
          <div className="-mx-4">
            {threads &&
              threads.map((thread) => (
                <div key={thread.id}>
                  <Thread thread={thread} id={thread.id} />
                </div>
              ))}
            {threads?.length === 0 && (
              <div>
                <Composer metadata={{ cardId: params.cardId.toString() }} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
