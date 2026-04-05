import { createContext, useState } from 'react';

const ConfirmDialogContext = createContext();

const initialState = {
  isOpen: false,
  title: '',
  description: '',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
  resolver: null,
};

export const ConfirmDialogContextProvider = ({ children }) => {
  const [confirmDialogState, setConfirmDialogState] = useState(initialState);

  const confirm = ({
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'default',
  }) => {
    return new Promise((resolve) => {
      setConfirmDialogState({
        isOpen: true,
        title,
        description,
        confirmText,
        cancelText,
        variant,
        resolver: resolve,
      });
    });
  };

  const handleConfirm = () => {
    confirmDialogState.resolver?.(true);
    setConfirmDialogState(initialState);
  };

  const handleCancel = () => {
    confirmDialogState.resolver?.(false);
    setConfirmDialogState(initialState);
  };

  return (
    <ConfirmDialogContext.Provider
      value={{
        confirmDialogState,
        confirm,
        handleConfirm,
        handleCancel,
      }}
    >
      {children}
    </ConfirmDialogContext.Provider>
  );
};

export default ConfirmDialogContext;
