import React from "react";
import { Outlet } from "react-router";
import Header from "./components/header";
import  LoginUserContextProvider from "./context/loginUserContext";

export default function App() {
  return (
    <LoginUserContextProvider>
      <Header />
      <Outlet />
    </LoginUserContextProvider>
  );
}
