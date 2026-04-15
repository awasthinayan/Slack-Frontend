import { useContext } from 'react';

import SocketContext from '@/Context/SocketContext/SocketContext';

export const useSocket = () => {
  return useContext(SocketContext);
};
