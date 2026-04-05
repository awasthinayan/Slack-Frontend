import { useContext } from 'react';

import ToastContext from '@/Context/ToastValueContext';

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastContextProvider.');
  }

  return context;
};
