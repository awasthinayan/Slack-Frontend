import { createContext, useState } from 'react';

const CreateChannelContext = new createContext();

export const CreateChannelContextProvider = ({ children }) => {
  const [opentoCreateChannelModal, setOpentoCreateChannelModal] =
    useState(false);

  return (
    <CreateChannelContext.Provider
      value={{ opentoCreateChannelModal, setOpentoCreateChannelModal }}
    >
       {children}
    </CreateChannelContext.Provider>
  );
};

export default CreateChannelContext;
