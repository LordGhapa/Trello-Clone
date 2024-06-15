import { getUserEmail } from "@/lib/useClient";

import { liveblocksClient } from "@/lib/liveblocksClient";
import Board from "@/components/Board";

type pageProps = {
  params: { boardId: string };
};
export default async function BoardPage({ params: { boardId } }: pageProps) {
  const UserEmail = await getUserEmail();
  const BoardInfo = await liveblocksClient.getRoom(boardId);

  const userAccess = BoardInfo?.usersAccesses?.[`${UserEmail}`];
  let hasAccess = userAccess && [...userAccess].includes("room:write");

  if (!hasAccess) {
    return <div>Acesso Negado</div>;
  }

  return (
    <div>
      {/* Quadro de Atividades: {BoardInfo.metadata.boardName} */}
      <Board name={BoardInfo.metadata.boardName as string} id={boardId} />
    </div>
  );
}
