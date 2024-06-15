"use client";
import { deleteBoard } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";

export default function BoardDeleteButton({ boardId }: { boardId: string }) {
  const route = useRouter();

  const handleDeleteBoard = async () => {
    await deleteBoard(boardId);
    route.push("/");
  };
  return (
    <div>
      <button
        className="rounded-md bg-red-500  px-4 py-2 text-white"
        onClick={() => handleDeleteBoard()}
      >
        Apagar Quadro
      </button>
    </div>
  );
}
