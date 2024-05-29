"use client";

import { redirect } from "next/navigation";
import { createBoard } from "../actions/boardActions";

export default function NewBoardPage() {
  const handleNewBoardSubmit = async (formData: FormData) => {
    const boardName = formData.get("name")?.toString() || "";
    const result = await createBoard(boardName);

    if (typeof result !== "boolean") {
      const { id } = result;
      redirect(`/boards/${id}`);
    }
  };
  return (
    <div>
      <form action={handleNewBoardSubmit} className="block max-w-xs">
        <h1 className="mb-4 text-2xl "> Criar Novo Quadro</h1>
        <input type="text" placeholder="Nome do quadro" name="name" />
        <button type="submit" className="mt-2 w-full">
          Criar Quadro
        </button>
      </form>
    </div>
  );
}
