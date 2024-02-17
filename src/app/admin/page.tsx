import { handleSignOut } from "@/lib/action";

const AdminPage = () => {
  return (
    <div>
      <p>AdminPage</p>
      <form action={handleSignOut}>
        <button className="bg-primary-purple text-white p-2 rounded-md">
          Logout
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
