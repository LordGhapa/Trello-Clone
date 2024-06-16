"use client";

import { addEmailAccessToBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

type NewBoardAccessFormProps = {
  boardId: string;
};

export default function NewBoardAccessForm({
  boardId,
}: NewBoardAccessFormProps) {
  const route = useRouter();
  function addEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = e.currentTarget.querySelector("input");
    if (email?.value.trim().length === 0) return;
    if (email) {
      addEmailAccessToBoard(boardId, email.value.trim());
      email.value = "";
    }

    route.refresh();
  }
  return (
    <form onSubmit={addEmail} className="max-w-[300px]">
      <h2 className="mb-2 text-lg">Adicionar Email</h2>
      <input type="email" placeholder="Jhon@gmail.com" name="email" />
      <button className="mt-2 w-full " type="submit">
        Adicionando Acesso
      </button>
    </form>
  );
}
