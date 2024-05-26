"use client";
import { useState } from "react";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";

const defaultColumns = [
  { id: "col 1", name: "A fazer", index: 0 },
  { id: "col 2", name: "Em progresso", index: 1 },
  { id: "col 3", name: "Finalizado", index: 2 },
];

export type CardType = {
  id: string | number;
  name: string;
  index: number;
  columnId: string;
};
const defaultCards: CardType[] = [
  { id: "alal0", name: "todo1", index: 0, columnId: "col 1" },
  { id: "alal1", name: "todo2", index: 1, columnId: "col 1" },
  { id: "alal2", name: "em progresso 1", index: 0, columnId: "col 2" },
  { id: "alal3", name: "em progresso 2", index: 1, columnId: "col 2" },
  { id: "alal4", name: "finalizado 1", index: 0, columnId: "col 3" },
  { id: "alal5", name: "finalizado 2", index: 1, columnId: "col 3" },
];

export default function Board() {
  const [cards, setCards] = useState(defaultCards);
  const [columns, setColumns] = useState(defaultColumns);
  return (
    <div className="flex gap-4 ">
      {columns.map((column, i) => (
        <Column
          key={column.id}
          {...column}
          setCards={setCards}
          cards={cards
            .filter((c) => c.columnId === column.id)
            .sort((a, b) => a.index - b.index)}
        />
      ))}
      <NewColumnForm />
    </div>
  );
}
