import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Gallary from "../pages/Gallary";

<BrowserRouter></BrowserRouter>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/gallary" element={<Gallary />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
