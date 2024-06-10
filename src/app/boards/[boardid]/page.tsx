import { getUserEmail } from "@/lib/useClient";

import { liveblocksClient } from "@/lib/liveblocksClient";
import Board from "@/components/Board";


type pageProps = {
  params: { boardid: string };
};
export default async function BoardPage({ params: { boardid } }: pageProps) {
  const UserEmail = await getUserEmail();
  const BoardInfo = await liveblocksClient.getRoom(boardid);

  const userAccess = BoardInfo?.usersAccesses?.[`${UserEmail}`];
  let hasAccess = userAccess && [...userAccess].includes("room:write");

  if (!hasAccess) {
    return <div>Acesso Negado</div>;
  }

  return (
    <div>
      Quadro de Atividades: {BoardInfo.metadata.boardName}
      <Board id={boardid} />
    </div>
  );
}
