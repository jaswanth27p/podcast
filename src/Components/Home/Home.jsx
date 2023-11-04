/* eslint-disable no-unused-vars */
import Banner from "./Banner";
import Contact from "./Contact";
import Fotter from "./Fotter";
import Login from "./Login";
import Navbar from "./Navbar";
import Popular from "./Popular";
import { useState } from "react";

export default function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [loginType, setLoginType] = useState("User");

  const openPopup = (type) => {
    setPopupVisible(true);
    setLoginType(type);
  };
  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <Navbar onOpen={openPopup} />
      <Login
        onClose={closePopup}
        type={loginType}
        isPopupVisible={isPopupVisible}
      />
      <Banner onOpen={openPopup} />
      <div id="popular">
        <Popular />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Fotter />
    </>
  );
}
