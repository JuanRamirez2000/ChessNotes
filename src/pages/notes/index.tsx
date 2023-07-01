import { api } from "~/utils/api";
import type { NextPageWithLayout } from "../_app";
import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";
import AnalysisCard from "~/components/AnalysisCard";

const Notes: NextPageWithLayout = () => {
  const { data } = api.analysis.grabAllAnalysisNotes.useQuery();
  console.log(data);
  return (
    <div className="flex flex-row flex-wrap gap-6">
      {data?.map((notebook) => (
        <AnalysisCard key={notebook.id} notebook={notebook} />
      ))}
    </div>
  );
};

Notes.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default Notes;
