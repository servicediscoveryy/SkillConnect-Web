import React from "react";
import {
  Star,
  MapPin,
  Eye,
  Shield,
  Award,
  Zap,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../utils/slug";

interface ServiceData {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string[];
  status: string;
  view: number;
  avgRating: number | null;
  ratingCount: number;
  category: {
    category: string;
  };
  createdAt: string;
}

interface ServiceData2 {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string[];
  status: string;
  view: number;
  avgRating: number | null;
  ratingCount: number;
  category: string;
  createdAt: string;
}

interface ImageRatingData {
  _id: string;
  image: string[];
  avgRating: number;
  title: string;
}

export const ElegantVerticalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-lg group cursor-pointer"
      onClick={() => navigate(`/${service._id}/${generateSlug(service.title)}`)}
    >
      <div className="relative">
        <img
          src={
            service.image[0] ||
            "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800"
          }
          alt={service.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-gray-900 font-semibold">₹{service.price}</span>
        </div>
      </div>
      <div className="p-6">
        {/* <div className="flex items-center gap-2 mb-3">
        <Award className="text-blue-500" size={18} />
        <span className="text-sm font-medium text-blue-600">
          {service.category.category}
        </span>
      </div> */}
        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
        <p className="text-gray-600 text mb-4 line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center justify-between text">
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400" size={16} fill="currentColor" />
            <span>{service.avgRating || "New"}</span>
          </div>
          <button className=" px-4 py-2 button">Add Now</button>
        </div>
      </div>
    </div>
  );
};

// Feature Cards
export const FeatureVerticalCard: React.FC<{ service: ServiceData2 }> = ({
  service,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden min-w-md cursor-pointer"
      onClick={() => navigate(`${service._id}/${generateSlug(service.title)}`)}
    >
      <div className="relative">
        <img
          src={
            service.image[0] ||
            "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800"
          }
          alt={service.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
          Top
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle className="text-green-500" size={18} />
          <span className="text font-semibold">{service.category}</span>
        </div>
        <h3 className=" subTitle font-bold mb-2">{service.title}</h3>
        <p className="text text-gray-600 mb-4 line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text">
              <Star className="text-yellow-400" size={16} fill="currentColor" />
              <span>{service.avgRating || "New"}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} className="text text-gray-400" />
              <span className="text text-gray-600">
                {service.ratingCount} reviews
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text text-gray-500">Starting from</span>
            <div className="subTitle">${service.price}</div>
          </div>
          <button className="px-6 py-2  button">Book Now</button>
        </div>
      </div>
    </div>
  );
};

// Premium Cards

export const PremiumVerticalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl p-6 shadow-xl">
    <div className="flex items-center gap-2 mb-4">
      <Zap className="text-yellow-400" size={20} />
      <span className="font-medium">Premium Service</span>
    </div>
    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
    <p className="text-gray-300 mb-4">{service.description}</p>
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center gap-1">
        <Star className="text-yellow-400" size={16} fill="currentColor" />
        <span>{service.avgRating || "New"}</span>
      </div>
      <span className="text-gray-400">•</span>
      <div className="flex items-center gap-1">
        <MapPin size={16} className="text-gray-400" />
        <span>{service.location}</span>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-2xl font-bold">${service.price}</span>
      <button className="bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100">
        Book Now
      </button>
    </div>
  </div>
);

export const PremiumHorizontalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl shadow-xl flex overflow-hidden">
    <div className="w-2/5 relative">
      <img
        src={
          service.image[0] ||
          "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800"
        }
        alt={service.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2">
          <Award className="text-yellow-400" size={20} />
          <span className="font-medium">Featured Service</span>
        </div>
      </div>
    </div>
    <div className="flex-1 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold">{service.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Shield className="text-green-400" size={16} />
            <span className="text-sm text-gray-300">Verified Provider</span>
          </div>
        </div>
        <span className="text-2xl font-bold">${service.price}</span>
      </div>
      <p className="text-gray-300 mb-4">{service.description}</p>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" size={16} fill="currentColor" />
          <div>
            <div className="font-medium">{service.avgRating || "New"}</div>
            <div className="text-xs text-gray-400">
              {service.ratingCount} reviews
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-400" />
          <div>
            <div className="font-medium">{service.location}</div>
            <div className="text-xs text-gray-400">Location</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={16} className="text-gray-400" />
          <div>
            <div className="font-medium">{service.view}</div>
            <div className="text-xs text-gray-400">Views</div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 bg-white text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-100">
          Book Now
        </button>
        <button className="px-6 py-2 border border-gray-600 rounded-lg hover:border-gray-500">
          Learn More
        </button>
      </div>
    </div>
  </div>
);

// image and rating only
export const ImageRating: React.FC<{ service: ImageRatingData }> = ({
  service,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center cursor-pointer"
      onClick={() => navigate(`${service._id}/${generateSlug(service.title)}`)}
    >
      <div className="w-[120px] sm:w-[150px] md:w-[180px] h-auto group">
        <div className="relative">
          <img
            src={service.image[0]}
            alt={service.title}
            className="w-full aspect-[7/12] object-cover rounded-lg bg-black/35 transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/150"; // Fallback image
            }}
          />
          <div className="absolute bottom-3 flex items-center justify-between w-full px-2">
            <p className="text font-semibold mt-2 ">{service.title}</p>
            <div className="bg-black/40 text-white text rounded-lg px-2 py-1 flex items-center gap-1">
              <FaStar className="text-yellow-400" /> {service.avgRating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
