import { Star, ShoppingCart } from "lucide-react";
import { ServiceData } from "../../constant/types";
import AddToCartButton from "../AddToCartButton";
import { generateSlug } from "../../utils/slug";
import { useLocation, useNavigate } from "react-router-dom";

interface RelatedServiceCardProps {
  service: ServiceData;
  onClick?: () => void;
}

export default function RelatedServiceCard({
  service,
  onClick,
}: RelatedServiceCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group min-w-[280px]"
      onClick={() => navigate(`/${service._id}/${generateSlug(service.title)}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={service.image[0]}
          alt={service.title[0]}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
          {service.category.category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200">
          {service.title}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-gray-900">
            ₹{service.price}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {service.avgRating}
            </span>
            <span className="text-sm text-gray-500">
              ({service.ratingCount})
            </span>
          </div>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group/btn">
          <AddToCartButton serviceId={service?._id} />
        </button>
      </div>
    </div>
  );
}
