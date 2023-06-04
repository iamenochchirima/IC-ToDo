import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Newpage from "./Newpage";

<BrowserRouter></BrowserRouter>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/test" element={<Newpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
