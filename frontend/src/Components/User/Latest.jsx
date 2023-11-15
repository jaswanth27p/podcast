/* eslint-disable react/prop-types */
import {
  useCategoriesSelector,
} from "../../redux/reducers/categories";



const Latest = () => {
  const { latest: latestData } = useCategoriesSelector();
  // Check if latestData is an array before using map
  if (!Array.isArray(latestData.data)) {
    console.error("latestData is not an array:", latestData);
    return null; // or render an appropriate message
  }
  const reversedData = [...latestData.data].reverse();

  return (
    <div className="container mx-auto p-4 ">
      <h2 className=" text-xl p-2 font-semibold">Latest</h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max ">
          {reversedData.map((podcast, index) => (
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
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4 overflow-x-auto">
        <div className="flex min-w-max">
          {genres.map((genre, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-2 mx-1 py-1 my-1 text-sm font-semibold text-gray-700"
            >
              {genre}
            </span>
          ))}
          <span className="inline-block bg-gray-200 rounded-full px-2 mx-1 my-1 py-1 text-sm font-semibold text-gray-700">
            Duration: {Math.round(duration / 60)} mins
          </span>
        </div>
      </div>
    </div>
  );
};

export default Latest;
