import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL as string, {
  withCredentials: true,
});

export const SocketContext = createContext<Socket>(socket);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};