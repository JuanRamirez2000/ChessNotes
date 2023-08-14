import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";
import type { NextPageWithLayout } from "../_app";
import UserNotesTable from "~/features/Notes/UserNotesTable";

const User: NextPageWithLayout = () => {
  return (
    <>
      <UserNotesTable />
    </>
  );
};

User.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default User;
