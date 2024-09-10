/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const VITE_SOCKET_URL = "http://localhost:5000/";

export const SocketContextProvider = ({ children }) => {
  const userId = "110ec58a-a0f2-4ac4-8393-c866d813b8d1";

  const [socket, setSocket] = useState(null);
  const [currentWallet, setCurrentWallet] = useState(0);

  // console.log("currentWallet", currentWallet);

  useEffect(() => {
    const socket = io(`${VITE_SOCKET_URL}`, {
      query: {
        userId: userId,
      },
    });

    if (socket) {
      socket.emit("walletRequest", {
        userId: userId,
      });

      socket.on("currentWallet", (data) => {
        if (data) {
          setCurrentWallet(data);
        }
      });
    }
    // console.log(socket);

    setSocket(socket);

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, currentWallet, setCurrentWallet, userId }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (context === undefined)
    throw new Error("useSocketContext must be used within a SocketContext");

  return context;
};
