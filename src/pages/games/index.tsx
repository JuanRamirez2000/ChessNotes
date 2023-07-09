import UserGamesTable from "~/features/userGamesTable/UserGamesTable";
import type { NextPageWithLayout } from "../_app";
import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";

const Games: NextPageWithLayout = () => {
  return (
    <>
      <UserGamesTable />
    </>
  );
};

Games.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default Games;
