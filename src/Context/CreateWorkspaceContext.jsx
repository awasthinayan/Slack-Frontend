import { createContext, useState } from 'react';

const CreateWorkspaceContext = createContext();

export const CreateWorkspaceContextProvider = ({children}) =>{
    const [openCreateWorkspaceModal, setopenCreateWorkspaceModal] = useState(false);

    return (
        <CreateWorkspaceContext.Provider value={{openCreateWorkspaceModal , setopenCreateWorkspaceModal}}>
            {children}
        </CreateWorkspaceContext.Provider>
    );
};

export default CreateWorkspaceContext;
