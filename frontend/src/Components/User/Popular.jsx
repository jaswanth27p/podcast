/* eslint-disable react/prop-types */

const podcasts = [
  {
    title: "Podcast Title 1",
    description: "Description of Podcast 1",
    imageUrl:
      "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-3.jpg",
    genre: "Technology",
    duration: "30 mins",
  },
  {
    title: "Podcast Title 2",
    description: "Description of Podcast 2",
    imageUrl:
      "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-1.jpg",
    genre: "Science",
    duration: "45 mins",
  },
  {
    title: "Podcast Title 3",
    description: "Description of Podcast 3",
    imageUrl:
      "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-3.jpg",
    genre: "Comedy",
    duration: "1 hour",
  },
  {
    title: "Podcast Title 4",
    description: "Description of Podcast 4",
    imageUrl:
      "https://preview.colorlib.com/theme/megapod/img/podcast/podcast-1.jpg",
    genre: "Health",
    duration: "40 mins",
  },
];

const Genres = () => {
  return (
    <div className="container mx-auto p-4 ">
      <h2 className=" text-xl p-2 font-semibold">Popular </h2>
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max ">
          {podcasts.map((podcast, index) => (
            <PodcastCard
              key={index}
              title={podcast.title}
              description={podcast.description}
              imageUrl={podcast.imageUrl}
              genre={podcast.genre}
              duration={podcast.duration}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PodcastCard = ({ title, description, imageUrl, genre, duration }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {genre}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Duration: {duration}
        </span>
      </div>
    </div>
  );
};


export default Genres;
