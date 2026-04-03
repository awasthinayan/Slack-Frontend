import { createContext, useState } from 'react';

const WorkspacePreferencesContext = createContext();

export const WorkspacePreferencesContextProvider = ({ children }) => {
  const [preferencesModalState, setPreferencesModalState] = useState({
    isOpen: false,
    workspace: null,
  });

  const openWorkspacePreferencesModal = (workspace) => {
    setPreferencesModalState({
      isOpen: true,
      workspace,
    });
  };

  const closeWorkspacePreferencesModal = () => {
    setPreferencesModalState({
      isOpen: false,
      workspace: null,
    });
  };

  const setWorkspacePreferencesModalOpen = (isOpen) => {
    setPreferencesModalState((previous) => ({
      isOpen,
      workspace: isOpen ? previous.workspace : null,
    }));
  };

  return (
    <WorkspacePreferencesContext.Provider
      value={{
        openWorkspacePreferencesModal,
        closeWorkspacePreferencesModal,
        preferencesModalState,
        setWorkspacePreferencesModalOpen,
      }}
    >
      {children}
    </WorkspacePreferencesContext.Provider>
  );
};

export default WorkspacePreferencesContext;
