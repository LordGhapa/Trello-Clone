"use client";
import { useBoardContext } from "@/app/context/BoardContext";
import { useUpdateMyPresence } from "@/app/liveblocks.config";
import CardModalBody from "@/components/CardModalBody";
import { useParams, useRouter } from "next/navigation";

import { useEffect } from "react";

export default function CardModal() {
  const router = useRouter();
  const params = useParams();
  const updateMyPresence = useUpdateMyPresence();
  const { setOpenCard } = useBoardContext();

  function handleBackdropClick() {
    router.back();
  }

  useEffect(() => {
    if (params.cardId) {
      setOpenCard(params.cardId as string);
      updateMyPresence({ cardId: params.cardId.toString() });
    }
  }, [params]);

  return (
    <>
      <div className="absolute inset-0 z-10  bg-black/70"></div>
      <div className=" fixed inset-0 z-20 w-full" onClick={handleBackdropClick}>
        <div className="mx-auto my-8 max-w-sm rounded-md  bg-white p-1 px-4">
          <div
            style={{ maxHeight: "calc(100vh - 2rem)" }}
            onClick={(e) => e.stopPropagation()}
            className="h-full overflow-scroll overflow-x-hidden"
          >
            <CardModalBody />
          </div>
        </div>
      </div>
    </>
  );
}
