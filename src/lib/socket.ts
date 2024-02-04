import { Socket } from "socket.io-client";

// Listen event to socket
export const StartListeners = (socket: Socket) => {
  socket.on("user_connected", (rs: { clientId: string; email: string }) => {
    // console.log("User connected", rs);
  });

  socket.on("all_users", (rs: any) => {
    console.log("All users:", rs);
  });

  // socket.on("get_friend_request", (rs: { message: string; email: string }) => {
  //   console.log("Get friend request:", rs);
  // });
};

// Send event to socket
export const GetSocketConnect = (
  socket: Socket,
  email: string,
  updateClientId: (clientId: string) => void
) => {
  socket.emit(
    "get_connect",
    { email: email },
    (res: { message: string; clientId: string; email: string }) => {
      // console.log("Check connect socket:", res);
      const { clientId } = res;
      updateClientId(clientId);
    }
  );
};

export const GetAllUsers = (socket: Socket) => {
  socket.emit("get_all_users");
};

export const sendFriendRequest = (
  socket: Socket,
  data: { senderEmail: string; receiverEmail: string }
) => {
  socket.emit(
    "send_friend_request",
    { senderEmail: data.senderEmail, receiverEmail: data.receiverEmail },
    (rs: any) => {
      console.log("check send friend request", rs);
    }
  );
};
