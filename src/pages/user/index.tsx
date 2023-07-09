import UserLoggedInLayout from "~/layouts/UserLoggedInLayout";
import type { NextPageWithLayout } from "../_app";

const User: NextPageWithLayout = () => {
  return <></>;
};

User.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLoggedInLayout>{page}</UserLoggedInLayout>;
};

export default User;
