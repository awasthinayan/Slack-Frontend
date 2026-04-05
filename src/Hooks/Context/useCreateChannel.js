import { useContext } from 'react';

import CreateChannelContext from '@/Context/CreateChannelContext';

export const useCreateChannelModal = () => {
  return useContext(CreateChannelContext);
};
