import {
  ArrowTopRightOnSquareIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import type { ChessNotebook } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import ChessBoardComponent from "~/features/ChessBoard/ChessBoard";
import ConfirmNotebookDeletion from "./modals/ConfirmNotebookDeletion";

export default function AnalysisCard({
  notebook,
}: {
  notebook: ChessNotebook;
}) {
  const router = useRouter();
  const [deletionConfirmationModal, setDeletionConfirmationModal] =
    useState(false);

  return (
    <>
      <ConfirmNotebookDeletion
        notebook={notebook}
        isOpen={deletionConfirmationModal}
        setIsOpen={setDeletionConfirmationModal}
      />
      <div className="flex flex-col items-center rounded-lg bg-cyan-950 p-2 text-cyan-100 shadow-lg hover:cursor-pointer">
        <h3 className="my-2 text-lg font-semibold">{notebook.title}</h3>
        <div className="mt-1 flex w-full flex-row justify-between">
          <button
            onClick={async () => {
              await router.push(`/notes/${notebook.id}`);
            }}
            className="text-md flex w-40 flex-row items-center justify-start gap-2 rounded-md border-b-8 border-b-cyan-900 bg-cyan-700 p-2 font-semibold text-cyan-100 active:border-b"
          >
            <ArrowTopRightOnSquareIcon className="ml-1 h-6 w-6" />
            <p>Go to Analysis</p>
          </button>
          <button className="text-md flex w-40 flex-row items-center justify-start gap-2 rounded-md border-b-8 border-b-cyan-900 bg-cyan-700 p-2 font-semibold text-cyan-100 active:border-b" onClick={()=>setDeletionConfirmationModal(true)}>
            <MinusCircleIcon className="ml-1 h-6 w-6" />
            <p>Delete</p>
          </button>
        </div>
        <ChessBoardComponent
          chessBoardWidth={350}
          startingPosition={notebook.position!}
        />
      </div>
    </>
  );
}
