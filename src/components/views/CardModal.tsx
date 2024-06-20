"use client";
import { useBoardContext } from "@/app/context/BoardContext";
import { useUpdateMyPresence } from "@/app/liveblocks.config";
import CardModalBody from "@/components/CardModalBody";
import { useParams, useRouter } from "next/navigation";
// import "@liveblocks/react-comments/styles.css";
import { useEffect } from "react";

export default function CardModal() {
  const router = useRouter();
  const params = useParams();
  // const updateMyPresence = useUpdateMyPresence();
  const { setOpenCard } = useBoardContext();

  function handleBackdropClick() {
    router.back();
  }

  useEffect(() => {
    

    if (params.cardId) {
      setOpenCard(params.cardId as string);
      // updateMyPresence({ cardId: params.cardId.toString() });
    }
  }, [params]);

  return (
    <>
      <div className="fixed inset-0 z-10 bg-black/70"></div>
      <div
        className="absolute inset-0 z-20 w-full"
        onClick={handleBackdropClick}
      >
        <div className="">
          <div className="mx-auto my-8 max-w-sm rounded-md bg-white p-1 px-4">
            <div onClick={(e) => e.stopPropagation()}>
              <CardModalBody /> 
            </div>
          </div>
          <div>&nbsp;</div>
        </div>
      </div>
    </>
  );
}
