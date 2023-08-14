import { useRouter } from "next/router";
import type { NextPageWithLayout } from "../_app";
import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";
import { api } from "~/utils/api";
import { useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ChessBoardComponent from "~/features/ChessBoard/ChessBoard";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const MDEditor = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default;
    }),
  { ssr: false }
);

const SingleNote: NextPageWithLayout = () => {
  const router = useRouter();
  const { data } = api.analysis.grabSingleAnalysisNotebook.useQuery({
    notebookID: router.query.id as string,
  });

  const updateNotebookMutation = api.analysis.editAnalysisNotebook.useMutation({
    onSuccess: () => {
      toast.success("Notebook Updated");
    },
  });
  const [currentNotes, setCurrentNotes] = useState<string | undefined>(
    data?.notes ? data.notes : ""
  );
  const [currentTitle, setCurrentTitle] = useState<string | undefined>(
    data?.title ? data.title : ""
  );

  const updateNotebook = () => {
    if (router.query.id && currentTitle && currentNotes) {
      updateNotebookMutation.mutate({
        notebookID: router.query.id as string,
        notebookTitle: currentTitle,
        notebookNotes: currentNotes,
      });
    }
  };

  return (
    <div data-color-mode="light">
      <h1>{currentTitle}</h1>
      <div>
        <div className="container">
          <MDEditor value={currentNotes} onChange={setCurrentNotes} />
          <button onClick={() => updateNotebook()}>Update</button>
        </div>
        {data?.position ? (
          <ChessBoardComponent startingPosition={data?.position} />
        ) : (
          <ChessBoardComponent />
        )}
      </div>
    </div>
  );
};

SingleNote.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default SingleNote;
