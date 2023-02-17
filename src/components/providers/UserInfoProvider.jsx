import { createContext, useState } from "react";

// コンテキストを作成
export const UserInfoContext = createContext({});

// プロバイダを作成
export const UserInfoProvider = (prop) => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    userId: "",
    orgId: "",
    isAuthed: false,
  });
  const { children } = prop;
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
