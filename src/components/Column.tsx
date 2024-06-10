import { CardType, useMutation, useStorage } from "@/app/liveblocks.config";

import { ReactSortable } from "react-sortablejs";
import { shallow } from "@liveblocks/client";
import NewCardForm from "./forms/NewCardForm";

type ColumnsProps = {
  id: string;
  name: string;
};

export default function Column({ id, name }: ColumnsProps) {
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

  return (
    <div className="w-48 rounded-md bg-white p-2 shadow-sm ">
      <h3>{name}</h3>
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
            {columnCards.map((card: CardType) => (
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
      <NewCardForm columnId={id} />
    </div>
  );
}
