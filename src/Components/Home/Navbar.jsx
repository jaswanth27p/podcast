/* eslint-disable react/prop-types */
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = ({ onOpen }) => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <nav className="bg-gray-50 p-2 container m-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold">PodCast</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <button
            onClick={() => scrollToSection("popular")}
            className="hover:text-blue-300"
          >
            Popular
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-blue-300"
          >
            Contact Us
          </button>
          <button
            onClick={() => onOpen("User")}
            className="hover:text-blue-300"
          >
            Login/Register
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hover:text-blue-300"
          >
            {!isMenuOpen &&   <MenuIcon />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-top justify-end z-50 bg-white bg-opacity-70">
          <div className="bg-white mt-6 p-4 rounded-md shadow-md">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
            <button
              onClick={() => scrollToSection("popular")}
              className="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-100"
            >
              Popular
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-100"
            >
              Contact Us
            </button>
            <button
              onClick={() => onOpen("User")}
              className="block px-4 py-2 text-lg text-gray-800 hover:bg-gray-100"
            >
              Login/Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
