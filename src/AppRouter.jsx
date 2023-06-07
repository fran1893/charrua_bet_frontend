import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  PageNotFound,
} from "./containers";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" exact={true} element={<PageNotFound />} />
    </Routes>
  );
}