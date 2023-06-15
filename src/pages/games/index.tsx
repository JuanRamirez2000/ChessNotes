import type { NextPageWithLayout } from "../_app";
import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";

const Games: NextPageWithLayout = () => {
  return <div> testing</div>;
};

Games.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default Games;
