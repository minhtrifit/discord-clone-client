import { auth } from "@/lib/auth";

const FriendPage = async () => {
  const session = await auth();

  // console.log("SESSION", session);

  return <div>FriendPage</div>;
};

export default FriendPage;
