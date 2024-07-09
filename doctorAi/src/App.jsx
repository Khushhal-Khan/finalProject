/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import LogIn from "./components/LogIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import PreCautions from "./components/PreCautions";
import Symptoms from "./components/Symptoms";
import Vital from "./components/Vital";
import Yes from "./components/Yes";
import Create from "./components/Create";
import Second from "./components/Second";
import UnAuth from "./components/UnAuth";
import Loader from "./components/Loader";


const App = () => {
 
 return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LogIn />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/home" element={<Home /> } />
          <Route exact path="/precautions" element={<PreCautions />} />
          <Route exact path="/symptoms" element={<Symptoms />} />
          <Route exact path="/vital" element={<Vital />} />
          <Route exact path="/answer" element={<Yes />} />
          <Route exact path="*" element={<Error />} />
          <Route exact path="/second" element={<Second />} />
          <Route exact path="/loader" element={<Loader/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;