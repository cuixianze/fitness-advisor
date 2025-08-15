import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, Route, Routes } from "react-router";
import Error from "./page/Error";
import Home from "./page/Home";
import { RouterProvider } from "react-router-dom";
import Diet from "./components/Diet/Diet";
import DietStep1 from "./components/Diet/DietStep1";
import DietStep2 from "./components/Diet/DietStep2";
import DietStep3 from "./components/Diet/DietStep3";
import DietStep4 from "./components/Diet/DietStep4";
import DietStep5 from "./components/Diet/DietStep5";
import DietStep6 from "./components/Diet/DietStep6";
import DietStep7 from "./components/Diet/DietStep7";
import DietLastStep from "./page/DietLastStep";
import Login from "./page/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "dietLastStep", element: <DietLastStep /> },
      { path: "login", element: <Login /> },
      {
        path: "diet",
        element: <Diet />,
        children: [
          { index: true, element: <DietStep1 /> },
          { path: "dietStep2", element: <DietStep2 /> },
          { path: "dietStep3", element: <DietStep3 /> },
          { path: "dietStep4", element: <DietStep4 /> },
          { path: "dietStep5", element: <DietStep5 /> },
          { path: "dietStep6", element: <DietStep6 /> },
          { path: "dietStep7", element: <DietStep7 /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
