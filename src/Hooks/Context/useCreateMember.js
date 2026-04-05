import { useContext } from 'react';

import CreateMemberContext from '@/Context/CreateMemberContext';

export const useCreateMemberModal = () => {
  return useContext(CreateMemberContext);
};
