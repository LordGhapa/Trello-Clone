"use client";
import { removeEmailFromBoard } from "@/app/actions/boardActions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RoomInfo } from "@liveblocks/node";
import { useRouter } from "next/navigation";
export default function EmailsAccessList({
  boardInfo,
}: {
  boardInfo: RoomInfo;
}) {
  const route = useRouter();
  const handleDelete = async (email: string) => {
    console.log(boardInfo.id);
    console.log(email);
    await removeEmailFromBoard(boardInfo.id, email);
    route.refresh();
  };
  return (
    <div className="max-w-xs">
      {Object.keys(boardInfo.usersAccesses).map((email) => (
        <div
          key={email}
          className="my-4  flex max-w-xs items-center justify-between gap-2  rounded-lg border pl-4"
        >
          <span className="line-clamp-1  " title={email}>
            {email}{" "}
          </span>
          <button onClick={() => handleDelete(email)} className="btn">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      ))}
    </div>
  );
}
