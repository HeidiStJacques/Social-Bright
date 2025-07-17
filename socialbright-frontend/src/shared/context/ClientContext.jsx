import React, { createContext, useContext, useState } from 'react';

const ClientContext = createContext();

export const useClient = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [clientId, setClientId] = useState(null);
  const [clientName, setClientName] = useState(null);

  return (
    <ClientContext.Provider value={{ clientId, setClientId, clientName, setClientName }}>
      {children}
    </ClientContext.Provider>
  );
};

