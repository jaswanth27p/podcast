/* eslint-disable no-unused-vars */
import Banner from "./Components/Home/Banner";
import Contact from "./Components/Home/Contact";
import Fotter from "./Components/Home/Fotter";
import Login from "./Components/Home/Login";
import Navbar from "./Components/Home/Navbar";
import Popular from "./Components/Home/Popular";
import { useState } from "react";

export default function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [loginType , setLoginType]= useState("User")
 
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
