import React, { createContext, useEffect, useState } from "react";
import { onUserStateChange } from "../api/firebase";

export const loginUserContext = createContext();

export default function loginUserContextProvider({ children }) {
    const [loginUser, setLoginUser] = useState('');

    useEffect(() => {   
        onUserStateChange(setLoginUser);
      }, []);


  return <loginUserContext.Provider value={loginUser}>{children}</loginUserContext.Provider>;
}
