import { createContext, useState } from 'react';

const CreateMemberContext = createContext(null);

export const CreateMemberContextProvider = ({ children }) => {
  const [opentoCreateMemberModal, setOpentoCreateMemberModal] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  return (
    <CreateMemberContext.Provider
      value={{
        opentoCreateMemberModal,
        setOpentoCreateMemberModal,
        selectedWorkspaceId,
        setSelectedWorkspaceId,
      }}
    >
      {children}
    </CreateMemberContext.Provider>
  );
};

export default CreateMemberContext;
