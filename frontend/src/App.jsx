/* eslint-disable no-unused-vars */
import Admin from "./Components/Admin/Admin";
import Home from "./Components/Home/Home";
import User from "./Components/User/User";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
