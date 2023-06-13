import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";
import type { NextPageWithLayout } from "../_app";
import { api } from "~/utils/api";
import UserGamesTable from "~/features/userGamesTable/UserGamesTable";

const User: NextPageWithLayout = () => {
  const mutation = api.chess.saveGamesToPlayer.useMutation();
  const handleDownload = () => {
    mutation.mutate();
  };
  return (
    <>
      <button onClick={handleDownload} className="bg-red-600 p-4">
        Grab games
      </button>
      {<UserGamesTable />}
    </>
  );
};

User.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default User;
