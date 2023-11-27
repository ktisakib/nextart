import { auth } from "@/utils/auth";

const DashboardPage = async () => {
  const session  = await auth();
  return <div>DashboardPage</div>;
};
export default DashboardPage;
