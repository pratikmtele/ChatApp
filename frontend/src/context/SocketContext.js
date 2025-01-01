import { io } from "socket.io-client";
import { useContext, createContext, useRef, useEffect, useState } from "react";

// create the context
const SocketContext = createContext();

const BACKEND_URL = "http://localhost:8000";

//provider compoenent
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// custom hook for using the socket
export const useSocket = () => {
  return useContext(SocketContext);
};
