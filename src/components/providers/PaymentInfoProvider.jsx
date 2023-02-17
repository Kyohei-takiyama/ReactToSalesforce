import React, { createContext, useState } from "react";

export const PaymentInfoContext = createContext();

export const PaymentInfoProvider = (prop) => {
  const [payInfo, setPayInfo] = useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  const { children } = prop;
  return (
    <PaymentInfoContext.Provider value={{ payInfo, setPayInfo }}>
      {children}
    </PaymentInfoContext.Provider>
  );
};
