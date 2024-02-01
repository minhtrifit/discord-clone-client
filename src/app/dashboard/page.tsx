import { handleSignOut } from "@/lib/action";

const DashboardPage = () => {
  return (
    <div>
      <p>DashboardPage</p>
      <form action={handleSignOut}>
        <button>Logout</button>
      </form>
    </div>
  );
};

export default DashboardPage;
