"use client";

import { FormEvent } from "react";

export default function NewColumnForm() {
  function handleNewColumn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    const columnName = input?.value;
    alert(columnName);
  }
  return (
    <form className="max-w-xs" onSubmit={handleNewColumn}>
      <label htmlFor="" className="block  ">
        <span className="block text-gray-600">Nome da coluna</span>
        <input type="text" name="" id="" placeholder="Nova Coluna" />
      </label>
      <button type="submit" className="mt-2 block w-full">
        Criar coluna
      </button>
    </form>
  );
}
