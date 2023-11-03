/* eslint-disable react/prop-types */
 

const Navbar = ({ onOpen}) => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="p-2 bg-gray-50 flex justify-between container m-auto items-center">
      <div className="flex items-center">
        <span className="text-2xl font-bold">PodCast</span>
      </div>
      <div className="space-x-6">
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
    </nav>
  );
};

export default Navbar;
