import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Checkout from "./components/menu/CheckOut";
import SignIn from "./components/Login/Signln";
import { UserInfoContext } from "./components/providers/UserInfoProvider";
import { PaymentInfoContext } from "./components/providers/PaymentInfoProvider";
import { AccInfoContext } from "./components/providers/AccInfoProvider";

function App() {
  const contextUserInfoValue = useContext(UserInfoContext);
  console.log("contextUserInfoValue", contextUserInfoValue);
  const contextPaymentInfoValue = useContext(PaymentInfoContext);
  console.log("contextPaymentInfoValue", contextPaymentInfoValue);
  const contextAccInfoValue = useContext(AccInfoContext);
  console.log("contextAccInfoValue", contextAccInfoValue);

  return (
    <>{contextUserInfoValue.userInfo.isAuthed ? <Checkout /> : <SignIn />}</>
  );
}

export default App;

// useEffect(() => {
//   console.log("test");
//   axios
//     .get("http://localhost:5000/api/todos")
//     .then((res) => {
//       const { records } = res.data;
//       const newTodos = records.map((ele) => {
//         const { Id, Subject, IsClosed } = ele;
//         return {
//           Id,
//           Subject,
//           IsClosed,
//         };
//       });
//       setTodos(newTodos);
//     })
//     .catch((err) => {
//       console.error(err.response.status);
//       console.error(err.response.data);
//     });
// }, [todo]);

// const getRecords = async () => {
//   try {
//     const result = await axios.get("http://localhost:5000/api/todos");
//     const { records } = result.data;
//     console.log(records);
//     const newTodos = records.map((ele) => {
//       const { Id, Subject, IsClosed } = ele;
//       return {
//         Id,
//         Subject,
//         IsClosed,
//       };
//     });
//     setTodos(newTodos);
//   } catch (error) {
//     console.error(error.response.status);
//     console.error(error.response.data);
//   }
// };
