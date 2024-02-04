import { Socket } from "socket.io-client";

// Listen event to socket
export const StartListeners = (socket: Socket) => {
  socket.on("user_connected", (rs: { clientId: string; email: string }) => {
    // console.log("User connected", rs);
  });

  socket.on("all_users", (rs: any) => {
    console.log("All users:", rs);
  });
};

// Send event to socket
export const GetSocketConntect = async (socket: Socket, email: string) => {
  socket.emit("get_connect", { email: email }, (checkConnect: boolean) => {
    console.log("Check connect socket:", checkConnect);
  });
};

export const GetAllUsers = async (socket: Socket) => {
  socket.emit("get_all_users");
};
