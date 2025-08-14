import React from "react";
import { Outlet } from "react-router";
import Header from "./components/header";

export default function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
