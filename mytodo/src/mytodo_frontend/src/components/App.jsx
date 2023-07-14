import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "../pages/Todo";
import Gallary from "../pages/Gallary";
import Layout from "./Layout";
import GalaxyBits from "../pages/GalaxyBits";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Gallary />} />
          <Route path="/galaxybits" element={<GalaxyBits />} />
          <Route path="/todo" element={<Todo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
