import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";
import Gallary from "./pages/Gallary";
import Layout from "./components/Layout";
import GalaxyBits from "./pages/GalaxyBits";
import { AuthContext } from "./AuthContext";
import Contact from "./pages/Contact";

// const 

const App = () => {
  return (
    // <AuthContext.Provider  >
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Gallary />} />
            <Route path="/galaxybits" element={<GalaxyBits />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    // </AuthContext.Provider>
  );
};

export default App;
