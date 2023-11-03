/* eslint-disable react/prop-types */


const Popular = () => {

    const cards = [
      {
        imageSrc:
          "https://preview.colorlib.com/theme/podcast/images/person_1.jpg",
        name: "John Doe",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, reiciendis.",
      },
      {
        imageSrc:
          "https://preview.colorlib.com/theme/podcast/images/person_1.jpg",
        name: "Jane Smith",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, veniam.",
      },
      {
        imageSrc:
          "https://preview.colorlib.com/theme/podcast/images/person_1.jpg",
        name: "Alice Johnson",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, laudantium.",
      },
      // Add more cards as needed
    ];
  return (
    <>
     
      <div className=" bg-gray-50 container mt-3 mx-auto py-5">
        <div className="grid  grid-cols-3  py-10 gap-4">
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </>
  );
}

const Card = ({ imageSrc, name, description }) => (
  <div className="bg-white rounded-lg shadow-xl">
    <div className="h-32 mt-4 ">
      <img src={imageSrc} alt="Image" className="mx-auto h-full rounded-full" />
    </div>
    <div className="p-4">
      <h3 className="text-xl text-center font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  </div>
);

export default Popular