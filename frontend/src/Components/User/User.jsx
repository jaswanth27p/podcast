import Favourite from "./Favourite"
import Navbar from "./Navbar";
import Genres from "./genres";
import Popular from "./Popular";
import Latest from "./Latest";
import Fotter from "../Home/Fotter"
const User = () => {
  return (
    <>
      <Navbar />
      <Popular />
      <Favourite />
      <Latest />
      <Genres />
      <Fotter/>
    </>
  );
};

export default User;
