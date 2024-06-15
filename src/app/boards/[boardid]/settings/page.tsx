"use server";

import BoardDeleteButton from "@/components/BoardDeleteButton";
import EmailsAccessList from "@/components/EmailsAccessList";
import NewBoardAccessForm from "@/components/forms/NewBoardAccessForm";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getUserEmail } from "@/lib/useClient";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type BoardSettingsProps = {
  params: { boardId: string };
};

export default async function BoardSettings({
  params: { boardId },
}: BoardSettingsProps) {
  const UserEmail = await getUserEmail();

  const boardInfo = await liveblocksClient.getRoom(boardId);

  const userAccess = boardInfo?.usersAccesses?.[`${UserEmail}`];
  let hasAccess = userAccess && [...userAccess].includes("room:write");

  if (!hasAccess) {
    return <div>Acesso Negado</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between">
        <Link
          className="btn  mb-4 inline-flex items-center gap-1"
          href={`/boards/${boardId}`}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Voltar
        </Link>{" "}
        <BoardDeleteButton boardId={boardId} />
      </div>

      <h1 className="text-2xl">
        Acesso ao quadro de atividades:{" "}
        <span className="font-bold">{boardInfo.metadata.boardName}</span>
      </h1>

      <div className="mb-8">
        <EmailsAccessList boardInfo={boardInfo} />
      </div>
      <NewBoardAccessForm boardId={boardId} />
    </div>
  );
}
