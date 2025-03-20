import React from "react";
import {
  Star,
  MapPin,
  Eye,
  Shield,
  Heart,
  Award,
  Zap,
  CheckCircle,
  Calendar,
  MessageCircle,
  DollarSign,
  Bookmark,
  Users,
  Sparkles,
  Briefcase,
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

interface ImageRatingData {
  image: string[];
  avgRating: number;
  title: string;
}

// Vertical Cards

export const SimpleVerticalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
    <img
      src={
        service.image[0] ||
        "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800"
      }
      alt={service.title}
      className="w-full h-48 object-cover rounded-lg mb-4"
    />
    <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-xl font-bold">${service.price}</span>
      <button className="text-blue-600 hover:text-blue-800">View →</button>
    </div>
  </div>
);

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
          <button className=" px-4 py-2 rounded-lg hover-effect ">
            Add Now
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModernVerticalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
    <div className="flex items-center gap-2 mb-4">
      <Sparkles className="text-yellow-500" size={20} />
      <span className="text-sm font-medium text-gray-600">
        {service.category.category}
      </span>
    </div>
    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
    <p className="text-gray-600 mb-4">{service.description}</p>
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-1">
        <MapPin size={16} className="text-gray-400" />
        <span className="text-sm text-gray-600">{service.location}</span>
      </div>
      <div className="flex items-center gap-1">
        <Eye size={16} className="text-gray-400" />
        <span className="text-sm text-gray-600">{service.view} views</span>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-2xl font-bold">${service.price}</span>
      <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
        Details
      </button>
    </div>
  </div>
);

// Horizontal Cards

export const SimpleHorizontalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow flex">
    <img
      src={
        service.image[0] ||
        "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800"
      }
      alt={service.title}
      className="w-1/3 object-cover rounded-l-lg"
    />
    <div className="p-4 flex-1">
      <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{service.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold">${service.price}</span>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" size={16} fill="currentColor" />
          <span>{service.avgRating || "New"}</span>
        </div>
      </div>
    </div>
  </div>
);

export const ElegantHorizontalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-white rounded-xl shadow-lg flex overflow-hidden group">
    <div className="w-2/5 relative overflow-hidden">
      <img
        src={
          service.image[0] ||
          "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800"
        }
        alt={service.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
        <span className="text-sm font-medium text-blue-600">
          {service.category.category}
        </span>
      </div>
    </div>
    <div className="flex-1 p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold">{service.title}</h3>
        <span className="text-2xl font-bold text-gray-900">
          ${service.price}
        </span>
      </div>
      <p className="text-gray-600 mt-2 mb-4">{service.description}</p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <MapPin size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">{service.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star className="text-yellow-400" size={16} fill="currentColor" />
          <span className="text-sm">{service.avgRating || "New"}</span>
        </div>
      </div>
      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Book Now
      </button>
    </div>
  </div>
);

export const ModernHorizontalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 flex gap-6">
    <div className="w-1/3">
      <div className="aspect-square rounded-xl overflow-hidden">
        <img
          src={
            service.image[0] ||
            "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800"
          }
          alt={service.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="text-green-500" size={18} />
        <span className="text-sm font-medium text-green-600">
          Verified Service
        </span>
      </div>
      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            {service.ratingCount} reviews
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            {new Date(service.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">${service.price}</span>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-300">
            Save
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Contact
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Compact Cards

export const CompactVerticalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-2 mb-2">
      <Briefcase size={16} className="text-gray-400" />
      <span className="text-sm text-gray-600">{service.category.category}</span>
    </div>
    <h3 className="font-medium mb-2">{service.title}</h3>
    <div className="flex justify-between items-center">
      <span className="font-bold">${service.price}</span>
      <span className="text-sm text-gray-600">{service.location}</span>
    </div>
  </div>
);

export const CompactHorizontalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
    <div className="w-12 h-12 rounded-lg overflow-hidden">
      <img
        src={
          service.image[0] ||
          "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800"
        }
        alt={service.title}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1">
      <h3 className="font-medium">{service.title}</h3>
      <span className="text-sm text-gray-600">{service.location}</span>
    </div>
    <span className="font-bold">${service.price}</span>
  </div>
);

// Feature Cards

export const FeatureVerticalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
        Featured
      </div>
      <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white">
        <Heart size={20} className="text-gray-600" />
      </button>
    </div>
    <div className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircle className="text-green-500" size={18} />
        <span className="text-sm font-medium">{service.category.category}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-400" size={16} fill="currentColor" />
            <span>{service.avgRating || "New"}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {service.ratingCount} reviews
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-500">Starting from</span>
          <div className="text-2xl font-bold">${service.price}</div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  </div>
);

export const FeatureHorizontalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden flex">
    <div className="w-2/5 relative">
      <img
        src={
          service.image[0] ||
          "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800"
        }
        alt={service.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm">
        Premium
      </div>
    </div>
    <div className="flex-1 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-yellow-500" size={18} />
            <span className="text-sm font-medium text-yellow-600">
              Top Rated
            </span>
          </div>
          <h3 className="text-xl font-bold">{service.title}</h3>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bookmark size={20} className="text-gray-600" />
        </button>
      </div>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" size={16} fill="currentColor" />
          <div>
            <div className="text-sm font-medium">
              {service.avgRating || "New"}
            </div>
            <div className="text-xs text-gray-500">
              {service.ratingCount} reviews
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-400" />
          <div>
            <div className="text-sm font-medium">{service.location}</div>
            <div className="text-xs text-gray-500">Location</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-green-500" />
          <div>
            <div className="text-sm font-medium">${service.price}</div>
            <div className="text-xs text-gray-500">Starting price</div>
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Book Now
        </button>
        <button className="px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-300">
          Contact Provider
        </button>
      </div>
    </div>
  </div>
);

// Status Cards

export const StatusVerticalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-white rounded-lg p-4 border-t-4 border-blue-500 shadow-sm">
    <div className="flex justify-between items-start mb-3">
      <h3 className="font-medium">{service.title}</h3>
      <span
        className={`px-2 py-1 rounded text-sm ${
          service.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {service.status}
      </span>
    </div>
    <div className="flex items-center gap-2 mb-3">
      <MapPin size={16} className="text-gray-400" />
      <span className="text-sm text-gray-600">{service.location}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="font-bold">${service.price}</span>
      <div className="flex items-center gap-1">
        <Eye size={16} className="text-gray-400" />
        <span className="text-sm text-gray-600">{service.view} views</span>
      </div>
    </div>
  </div>
);

export const StatusHorizontalCard: React.FC<{ service: ServiceData }> = ({
  service,
}) => (
  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 shadow-sm flex items-center gap-4">
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-medium">{service.title}</h3>
        <span
          className={`px-2 py-1 rounded text-xs ${
            service.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {service.status}
        </span>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <span>{service.category.category}</span>
        <span>•</span>
        <span>{service.location}</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <Eye size={16} className="text-gray-400" />
        <span className="text-sm text-gray-600">{service.view}</span>
      </div>
      <span className="font-bold">${service.price}</span>
    </div>
  </div>
);

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
}) => (
  <div className="flex flex-col items-center">
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
