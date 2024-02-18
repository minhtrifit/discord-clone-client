import StorageBarChart from "@/components/admin/StorageBarChart";
import StorageBieChart from "@/components/admin/StorageBieChart";

import { listAllFiles } from "@/lib/supabase";

const StoragePage = async () => {
  const userRes = await listAllFiles("uploads", "user_avatars");
  const serverRes = await listAllFiles("uploads", "server_avatars");
  const imageRes = await listAllFiles("uploads", "images");
  const fileRes = await listAllFiles("uploads", "files");

  return (
    <div className="w-[calc(100vw-260px)]">
      <div className="max-h-screen p-6 flex items-start gap-5 overflow-y-auto flex-wrap">
        <StorageBieChart
          userRes={userRes}
          serverRes={serverRes}
          imageRes={imageRes}
          fileRes={fileRes}
        />
        <StorageBarChart
          userRes={userRes}
          serverRes={serverRes}
          imageRes={imageRes}
          fileRes={fileRes}
        />
      </div>
    </div>
  );
};

export default StoragePage;
