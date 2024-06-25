import React from "react";
import BoardPage from "../../page";

type CardPageProps = {
  params: { boardId: string; cardId: string };
};

export default function CardPage({ params }: CardPageProps) {
 
  return (
    <div>
      <BoardPage params={params} />
    </div>
  );
}
