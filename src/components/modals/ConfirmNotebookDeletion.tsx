import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import type { ChessNotebook } from "@prisma/client";
import { Dialog } from "@headlessui/react";

export default function ConfirmNotebookDeletion({
  isOpen,
  setIsOpen,
  notebook,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notebook: ChessNotebook;
}) {
  const utils = api.useContext();
  const deleteAnalysisNotebook =
    api.analysis.deleteAnalysisNotebook.useMutation({
      onSuccess: async () => {
        toast.success("Notebook Deleted!");
        await utils.analysis.grabAllAnalysisNotes.invalidate();
      },
      onError: () => {
        toast.error("Failed Deleting notebook");
      },
    });

  const handleAnalysisDelete = () => {
    deleteAnalysisNotebook.mutate({ notebookID: notebook.id });
  };
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="max-w-sm rounded bg-zinc-600 p-4 ">
          <Dialog.Title>Deleting Notebook</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete {notebook.title}
          </Dialog.Description>
          <button
            className="text-md flex w-40 flex-row items-center justify-start gap-2 rounded-md border-b-8 border-b-cyan-900 bg-cyan-700 p-2 font-semibold text-cyan-100 active:border-b"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="text-md flex w-40 flex-row items-center justify-start gap-2 rounded-md border-b-8 border-b-cyan-900 bg-cyan-700 p-2 font-semibold text-cyan-100 active:border-b"
            onClick={() => {
              handleAnalysisDelete();
            }}
          >
            <CheckBadgeIcon className="ml-1 h-6 w-6" />
            <p>Confirm Deletion</p>
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
