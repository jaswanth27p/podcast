import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const podcastGenres = [
  {
    name: 'True Crime',
    img: 'https://preview.colorlib.com/theme/megapod/img/podcast/podcast-2.jpg',
  },
  {
    name: 'News',
    img: 'https://preview.colorlib.com/theme/megapod/img/podcast/podcast-4.jpg',
  },

  {name: "Comedy",
  img: "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-2.jpg",
},
{
  name: "Horror",
  img: "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-4.jpg",
},
{
  name: "True Crime",
  img: "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-2.jpg",
},
{
  name: "News",
  img: "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-4.jpg",
},
{
  name: "Comedy",
  img: "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-2.jpg",
},
{
  name: "Horror",
  img: "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-4.jpg",
},
  // Add more genres here
];

const Genres = () => {
  const navigate = useNavigate();

  const handleGenreSelect = (genre) => {
    // Navigate to the GenrePlaylists component with the selected genre
    navigate(`/playlists/${genre.name}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl p-2 font-semibold">Genres</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max">
          {podcastGenres.map((genre, index) => (
            <div key={index} onClick={() => handleGenreSelect(genre)}>
              {/* You can create a GenreCard component for styling */}
              <Card
                sx={{
                  width: 120,
                  height: 120,
                  backgroundImage: `url(${genre.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
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