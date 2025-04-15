import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StarRating from "../StarRating";
import { ServiceData } from "../../constant/types";
import { generateSlug } from "../../utils/slug";
import BookNowButton from "../BookNowButton";
import { recordInteraction } from "../../hooks/IncrementCount";

interface ServiceCardProps {
  service: ServiceData;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/${service._id}/${generateSlug(service.title)}`);
        recordInteraction(service._id, "view");
      }}
      className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative">
        <img
          src={service.image[0]}
          alt={service.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="font-semibold text-blue-600">₹{service.price}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 h-10">
            {service.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin size={16} className="text-blue-500" />
            <span className="capitalize">{service.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StarRating rating={service.avgRating || 0} />
              <span className="text-sm text-gray-500">
                ({service.ratingCount})
              </span>
            </div>
            <BookNowButton serviceId={service._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
