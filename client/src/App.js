import React from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbars from "./components/Navbars";

function App() {
  return (
    <BrowserRouter >
        <Navbars/>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
