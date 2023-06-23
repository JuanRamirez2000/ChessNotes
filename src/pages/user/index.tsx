import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";
import type { NextPageWithLayout } from "../_app";
import UserGamesTable from "~/features/userGamesTable/UserGamesTable";

const User: NextPageWithLayout = () => {
  return <>{<UserGamesTable />}</>;
};

User.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default User;
