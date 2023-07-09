import { useRouter } from "next/router";
import type { NextPageWithLayout } from "../_app";
import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";
import { api } from "~/utils/api";
//import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import ChessBoardComponent from "~/features/ChessBoard/ChessBoard";
import dynamic from "next/dynamic";

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
  const [currentNotes, setCurrentNotes] = useState<string | undefined>(
    data?.notes ? data.notes : ""
  );
  return (
    <div data-color-mode="light">
      <h1>{data?.title}</h1>
      <div>
        <div className="container">
          <MDEditor value={currentNotes} onChange={setCurrentNotes} />
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
