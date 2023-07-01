import { useRouter } from "next/router";
import type { NextPageWithLayout } from "../_app";
import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";
import { api } from "~/utils/api";

const SingleNote: NextPageWithLayout = () => {
  const router = useRouter();
  const { data } = api.analysis.grabSingleAnalysisNotebook.useQuery({
    notebookID: router.query.id as string,
  });

  return <div>Dynamic route: {router.query.id}</div>;
};

SingleNote.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default SingleNote;
