import React from "react";
import { useLocation } from "react-router-dom";

export default function DietLastStep() {
  const {state} = useLocation();
  console.log("mock data", state.mock);
  
}