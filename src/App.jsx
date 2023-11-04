/* eslint-disable no-unused-vars */
import Home from "./Components/Home/Home";
import User from "./Components/User/User";
import { HashRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </HashRouter>
    </>
  );
}
