const ServicesList = () => {
  const Services = [
    {
      providerId: "60c72b2f9f1b2c001c8e4e1a", // Dummy provider ID (replace with valid ones)
      title: "Electrician Service",
      description: "Professional electrician service for all your needs.",
      category: "Electrical",
      image:
        "https://kolbelectric.com/wp-content/uploads/2022/03/electrical-outlet-repair-1024x683.jpg", // Example Google image URL
      price: 100,
      status: "active",
      tags: ["electrician", "repair", "home"],
    },
    {
      providerId: "60c72b2f9f1b2c001c8e4e1a",
      title: "Plumbing Service",
      description: "Expert plumbing services for any kind of water issues.",
      category: "Plumbing",
      image: "https://media.graphassets.com/IbaODSMISHOZp9KCvuFx",
      price: 150,
      status: "active",
      tags: ["plumbing", "water", "repair"],
    },
    {
      providerId: "60c72b2f9f1b2c001c8e4e1a",
      title: "Car Mechanic Service",
      description: "Get your car repaired by expert mechanics.",
      category: "Automobile",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjcaA6lMP6l_XCvZNwl0ql4t3n5RDng8HRdA&s",
      price: 200,
      status: "active",
      tags: ["mechanic", "car", "repair"],
    },
    {
      providerId: "60c72b2f9f1b2c001c8e4e1a",
      title: "Home Cleaning Service",
      description: "Top-notch home cleaning service at your doorstep.",
      category: "Cleaning",
      image:
        "https://www.shutterstock.com/image-photo/cleaning-construction-debris-after-repair-600nw-2284359323.jpg",
      price: 80,
      status: "active",
      tags: ["cleaning", "home", "service"],
    },

    {
      providerId: "60c72b2f9f1b2c001c8e4e1a",
      title: "Cooking Service",
      description: "Get a personal chef to cook for your events.",
      category: "Cooking",
      image:
        "https://cdn.shopify.com/s/files/1/1186/5476/files/LIFESTYLE_2000x2000_48e752d7-2561-4472-831d-f164a3ea7405_1024x1024.jpg?v=1565717897",
      price: 120,
      status: "active",
      tags: ["cooking", "chef", "events"],
    },
    {
      providerId: "60c72b2f9f1b2c001c8e4e1a",
      title: "Painting Service",
      description: "Professional painting services for homes and offices.",
      category: "Painting",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/10/WD/TJ/GA/42460889/home-painting.jpg",
      price: 180,
      status: "active",
      tags: ["painting", "home", "office"],
    },
    {
      providerId: "60c72b2f9f1b2c001c8e4e1a",
      title: "Carpentry Service",
      description: "Expert carpentry work for all your furniture needs.",
      category: "Carpentry",
      image:
        "https://cdn.prod.website-files.com/647888ca92d03e3fca3f1ea0/647888ca92d03e3fca3f2389_carpentry.jpg",
      price: 160,
      status: "active",
      tags: ["carpentry", "furniture", "repair"],
    },
    {
      providerId: "60c72b2f9f1b2c001c8e4e1a",
      title: "AC Repair Service",
      description: "Expert technicians for all AC repair and maintenance.",
      category: "AC Repair",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5PxsKVsdsC8dNUH5sQN4tyF225peZSmEysQ&s",
      price: 140,
      status: "active",
      tags: ["AC", "repair", "maintenance"],
    },
  ];

  return (
    <div className="h-screen p-6 ">
      <div className="grid grid-cols-1  max-w-[80rem] mx-auto sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Services.map((service) => (
          <div
            key={service.providerId}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{service.title}</h2>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <p className="text-lg font-semibold">Price: ${service.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
