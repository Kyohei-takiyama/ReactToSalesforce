import React from "react";
import ReactDom from "react-dom/client";
import App from "./App";
import { AccInfoProvider } from "./components/providers/AccInfoProvider";
import { PaymentInfoProvider } from "./components/providers/PaymentInfoProvider";
import UserInfoProvider from "./components/providers/UserInfoProvider";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <UserInfoProvider>
    <PaymentInfoProvider>
      <AccInfoProvider>
        <App />
      </AccInfoProvider>
    </PaymentInfoProvider>
  </UserInfoProvider>
);
