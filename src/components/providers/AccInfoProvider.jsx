import React, { createContext, useState } from "react";

export const AccInfoContext = createContext();

export const AccInfoProvider = ({ children }) => {
  const [accInfo, setAccInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    postCode: "",
    state: "",
    city: "",
    street: "",
  });
  return (
    <AccInfoContext.Provider value={{ accInfo, setAccInfo }}>
      {children}
    </AccInfoContext.Provider>
  );
};
