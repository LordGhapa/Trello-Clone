"use client";

import { useMutation, useStorage } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from "uniqid";

export default function NewColumnForm() {

  const addColumn = useMutation(({ storage }, columnName) => {
    return storage.get("columns").push(
      new LiveObject({
        name: columnName as string,
        id: uniqid.time(),
        index: 9999,
      }),
    );
  }, []);



  function handleNewColumn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
     if (input?.value.trim().length === 0) return;
    if (input) {
      const columnName = input?.value;
      addColumn(columnName);
      input.value = "";
    }
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
