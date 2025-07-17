import React, { createContext, useContext, useState, useEffect } from 'react';

export const TenantContext = createContext();

export const TenantProvider = ({ children }) => {
  const [tenantId, setTenantId] = useState(null);
  const [tenantName, setTenantName] = useState("");
  const [features, setFeatures] = useState({});

  useEffect(() => {
    if (tenantId) {
      // TEMP: Load from local or static
      const featureMap = {
        calendar: true,
        tasks: true,
        documents: false,
        carePlan: true,
      };
      setFeatures(featureMap);
    }
  }, [tenantId]);

  return (
    <TenantContext.Provider
      value={{
        tenantId,
        setTenantId,
        tenantName,
        setTenantName,
        features,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
