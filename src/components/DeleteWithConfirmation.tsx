"use client";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
  onDelete: () => void;
};
export default function DeleteWithConfirmation({ onDelete }: Props) {
  const [wannaDelete, setWannaDelete] = useState(false);

  if (wannaDelete) {
    return (
      <div>
        <h4 className="mb-2 text-center">Voce Tem Certeza?</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="">
            <button
              className="btn with-icon block w-full grow"
              onClick={() => setWannaDelete(false)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Não
            </button>
          </div>
          <div>
            <button onClick={onDelete} className="btn red with-icon w-full">
              Sim, Apague!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setWannaDelete(true)}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-red-500 p-2 text-white"
    >
      <FontAwesomeIcon icon={faTrash} />
      Apagar
    </button>
  );
}
