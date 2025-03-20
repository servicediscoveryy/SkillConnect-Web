import { Services } from "../../constant/data/services";

const ServicesList = () => {
  return (
    <div className=" bg-white p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Services.map((service) => (
          <div
            key={service.providerId}
            className="bg-white shadow-sm rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover aspect-[1/2]"
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
