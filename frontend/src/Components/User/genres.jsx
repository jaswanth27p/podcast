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

  // Array of image URLs for genres
const genreImageURLs = [
  "url('https://cdn.ces.tech/ces/media/articles/2022/october/innovation.jpg')",
  "url('https://cdn.create.vista.com/api/media/small/310924836/stock-photo-books-microscope-glass-test-tubes-flasks-colorful-liquid-blue-background')",
  "url('https://media.istockphoto.com/id/1280587810/photo/healthy-eating-exercising-weight-and-blood-pressure-control.jpg?b=1&s=612x612&w=0&k=20&c=VVrfTgmWB2kfCkCJbDJQ514mkmQcVQ9cQf44udxOkNA=')",
  "url('https://wallpapers.com/images/hd/horror-pictures-uesit3ikn1jfot2s.jpg')",
  "url('https://s01.sgp1.digitaloceanspaces.com/large/859674-75199-axhywvjxyg-1511960362.jpg')",
  "url('https://brightwatergroup.com/media/1752/health-benefits-of-laughter-3.png?width=930&height=465')",
  "url('https://media.istockphoto.com/id/1264074047/vector/breaking-news-background.jpg?s=612x612&w=0&k=20&c=C5BryvaM-X1IiQtdyswR3HskyIZCqvNRojrCRLoTN0Q=')",
  "url('https://i0.wp.com/picjumbo.com/wp-content/uploads/business-man-speaking-in-front-of-colleagues-at-team-meeting-free-photo.jpg?w=600&quality=80')",
];


  const handleGenreSelect = (genre) => {
    navigate(`/playlists/${genre.name}`);
  };

  return (
    <div className="container mx-auto px-5">
      <h2 className="text-xl py-2 px-2 font-semibold">Genres</h2>
      <div className="overflow-x-auto">
      <div className="flex gap-5 justify-center">
          {genres.map((genre, index) => (
            <div key={index} onClick={() => handleGenreSelect(genre)}>
              <Card
                sx={{
                  width: 132,
                  height: 132,
                  backgroundImage: genreImageURLs[index],
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