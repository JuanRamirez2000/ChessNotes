import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import type { ChessNotebook } from "@prisma/client";

export default function ConfirmNotebookDeletion({
  notebook,
}: {
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
    <div>
      <h2>Deleting Notebook</h2>
      <p>Are you sure you want to delete</p>
      <button className="text-md flex w-40 flex-row items-center justify-start gap-2 rounded-md border-b-8 border-b-cyan-900 bg-cyan-700 p-2 font-semibold text-cyan-100 active:border-b" onClick={() => {
        handleAnalysisDelete()
      }}>
        <CheckBadgeIcon className="ml-1 h-6 w-6" />
        <p>Confirm Deletion</p>
      </button>
    </div>
  );
}
