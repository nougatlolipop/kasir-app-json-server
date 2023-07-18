import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <main>
        <Routes>
          <Route path="/sukses" Component={Sukses}/>
          <Route path="/" Component={Home}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App