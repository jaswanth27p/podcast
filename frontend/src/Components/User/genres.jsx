import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Genres = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${backendUrl}/categories`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        // Filter out "Trending" and "Latest" genres
        const filteredGenres = data.filter(
          (genre) => genre.name !== "Trending" && genre.name !== "Latest"
        );
        setGenres(filteredGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreSelect = (genre) => {
    navigate(`/playlists/${genre.name}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl p-2 font-semibold">Genres</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {genres.map((genre, index) => (
            <div key={index} onClick={() => handleGenreSelect(genre)}>
              <Card
                sx={{
                  width: 120,
                  height: 120,
                  backgroundImage: `url("https://preview.colorlib.com/theme/megapod/img/podcast/podcast-4.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <CardContent className="flex items-center justify-center h-full font-extrabold bg-gray-500 bg-opacity-70 text-white">
                  {genre.name}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genres;
