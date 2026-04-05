import { createContext, useState } from 'react';

const CreateChannelContext = createContext(null);

export const CreateChannelContextProvider = ({ children }) => {
  const [opentoCreateChannelModal, setOpentoCreateChannelModal] =
    useState(false);

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  return (
    <CreateChannelContext.Provider
      value={{
        opentoCreateChannelModal,
        setOpentoCreateChannelModal,
        selectedWorkspaceId,
        setSelectedWorkspaceId,
      }}
    >
      {children}
    </CreateChannelContext.Provider>
  );
};

export default CreateChannelContext;
