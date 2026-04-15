import { createContext, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState(null);

  const socket = useMemo(() => io(import.meta.env.VITE_BACKEND_SOCKET_URL), []);

  async function joinChannel(channelId) {
    socket.emit('JoinChannel', { channelId }, (data) => {
      console.log('Successfully joined channel', data);
      setCurrentChannel(data?.data);
    });
  }

  return (
    <SocketContext.Provider
      value={{ socket, joinChannel, currentChannel, setCurrentChannel }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
