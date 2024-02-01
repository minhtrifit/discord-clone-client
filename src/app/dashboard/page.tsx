import { ThemeToggle } from "@/components/ThemeToggle";
import { handleSignOut } from "@/lib/action";

const DashboardPage = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-5">
        <ThemeToggle />
        <p>DashboardPage</p>
        <form action={handleSignOut}>
          <button className="bg-primary-purple text-white p-2 rounded-md">
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardPage;
