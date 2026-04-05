import { useRef, useState } from 'react';

import ToastContext from './ToastValueContext';

const TOAST_DURATION_MS = 3000;

export const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timeoutRefs = useRef(new Map());

  const removeToast = (id) => {
    const timeout = timeoutRefs.current.get(id);

    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(id);
    }

    setToasts((previous) => previous.filter((toast) => toast.id !== id));
  };

  const showToast = ({
    title,
    description = '',
    type = 'success',
  }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    setToasts((previous) => [
      ...previous,
      { id, title, description, type },
    ]);

    const timeout = setTimeout(() => {
      removeToast(id);
    }, TOAST_DURATION_MS);

    timeoutRefs.current.set(id, timeout);
  };

  return (
    <ToastContext.Provider
      value={{
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
