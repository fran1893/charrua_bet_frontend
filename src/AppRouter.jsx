import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  PageNotFound,
  BetHistoryPlayer
} from "./containers";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bet-history" element={<BetHistoryPlayer />} />
      <Route path="*" exact={true} element={<PageNotFound />} />
    </Routes>
  );
}