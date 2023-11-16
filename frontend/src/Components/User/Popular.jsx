/* eslint-disable react/prop-types */
import {
  useCategoriesSelector,
} from "../../redux/reducers/categories";



const Popular = () => {
  const { trending: trendingData } = useCategoriesSelector();
   

  return (
    <div className="container mx-auto p-4 ">
      <h2 className=" text-xl p-2 font-semibold">Trending</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max ">
          {trendingData.data.map((podcast, index) => (
            <PodcastCard
              key={index}
              title={podcast.title}
              description={podcast.description}
              imageUrl={podcast.image_url}
              genres={podcast.genres}
              duration={podcast.duration}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PodcastCard = ({ title, description, imageUrl, genres, duration }) => {
  // Set the maximum number of genres to display
  const maxGenres = 1;
  const truncatedGenres = genres.slice(0, maxGenres);
  const remainingGenres = genres.length - maxGenres;

  return (
    <div className="rounded overflow-hidden shadow-lg max-w-sm min-w-xs">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4 overflow-x-auto">
        <div className="flex min-w-max">
          {truncatedGenres.map((genre, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-2 mx-1 py-1 my-1 text-sm font-semibold text-gray-700"
            >
              {genre}
            </span>
          ))}
          {remainingGenres > 0 && (
            <span className="inline-block bg-gray-200 rounded-full px-2 mx-1 my-1 py-1 text-sm font-semibold text-gray-700">
              +{remainingGenres} more
            </span>
          )}
          <span className="inline-block bg-gray-200 rounded-full px-2 mx-1 my-1 py-1 text-sm font-semibold text-gray-700">
            Duration: {Math.round(duration / 60)} mins
          </span>
        </div>
      </div>
    </div>
  );
};


export default Popular;
