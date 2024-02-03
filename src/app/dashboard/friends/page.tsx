import { ThemeToggle } from "@/components/ThemeToggle";
import { auth } from "@/lib/auth";

const FriendPage = async () => {
  const session = await auth();

  // console.log("SESSION", session);

  return (
    <div>
      <ThemeToggle />
    </div>
  );
};

export default FriendPage;
