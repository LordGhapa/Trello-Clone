import { Dispatch, SetStateAction } from "react";
import { CardType } from "./Board";
import { ReactSortable } from "react-sortablejs";

type ColumnsProps = {
  id: string;
  name: string;
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

export default function Column({ id, name, cards, setCards }: ColumnsProps) {

  function setCardsForColumn(sortedCards: CardType[], newColumnId: string) {

    setCards((prevCards) => {
      const newCards = [...prevCards];


      sortedCards.forEach((card, newIndex) => {
        const foundCard = newCards.find((newCard) => newCard.id === card.id);
        if (foundCard) {
          foundCard.index = newIndex;
          foundCard.columnId = newColumnId;
        }
      });

      return newCards;
    });

  }
  return (
    <div className="w-48 rounded-md bg-white p-2 shadow-sm ">
      <h3>{name}</h3>
      <ReactSortable
        animation={200}
        easing="ease-out"
        className="h-full"
        ghostClass="ghostClass"
        list={cards}
        setList={(items) => setCardsForColumn(items, id)}
        group={"cards"}
      >
        {cards.map((card) => (
          <div key={card.id} className="my-2 rounded-md border bg-white p-4">
            <span>{card.name}</span>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
}
