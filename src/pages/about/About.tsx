import { useState } from "react";
import { Star, MapPin, Eye, ShoppingCart } from "lucide-react";
import StarRating from "../../components/StarRating";
import ImageCarousel from "../../components/ImageCarousel";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { ServiceDetail } from "../../constant/types";
import CircularLoader from "../../components/CircularLoader";

// Mock data - in real app this would come from props/API
// const serviceData = {
//   title: "cooking service",
//   description: "making the paneer and meat",
//   price: 400,
//   location: "pune",
//   image: [
//     "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=1200",
//     "https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=1200",
//     "https://images.unsplash.com/photo-1428515613728-6b4607e44363?auto=format&fit=crop&q=80&w=1200",
//   ],
//   status: "active",
//   view: 0,
//   provider: {
//     email: "provider@gmail.com",
//     profilePicture:
//       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//   },
//   ratings: [
//     {
//       rating: 3,
//       description: "good",
//       userId: {
//         email: "provider@gmail.com",
//         profilePicture:
//           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//       },
//     },
//     {
//       rating: 3,
//       description: "good",
//       userId: {
//         email: "provider@gmail.com",
//         profilePicture:
//           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//       },
//     },
//     {
//       rating: 5,
//       description: "good",
//       userId: {
//         email: "provider@gmail.com",
//         profilePicture:
//           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//       },
//     },
//     {
//       rating: 4,
//       description: "good",
//       userId: {
//         email: "provider@gmail.com",
//         profilePicture:
//           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//       },
//     },
//   ],
//   ratingAvg: [
//     {
//       avgRating: 3.75,
//       totalRating: 4,
//     },
//   ],
// };

// Mock related items data
const relatedItems = [
  {
    id: 1,
    title: "Baking Service",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Catering Service",
    price: 600,
    image:
      "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=1200",
    rating: 4.8,
  },
  {
    id: 3,
    title: "Private Chef",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=1200",
    rating: 4.7,
  },
];

function AddToCartButton() {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAdded}
      className={`flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 text-white font-medium rounded-lg transition-all duration-300 transform ${
        isAdded
          ? "bg-green-500 scale-95"
          : "bg-indigo-600 hover:bg-indigo-700 hover:scale-105"
      }`}
    >
      <ShoppingCart
        className={`w-5 h-5 transition-transform duration-300 ${
          isAdded ? "scale-110" : ""
        }`}
      />
      <span>{isAdded ? "Added to Cart!" : "Add to Cart"}</span>
    </button>
  );
}

function RelatedItem({ item }: { item: (typeof relatedItems)[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{item.title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
          </div>
        </div>
        <button className="mt-3 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}

function About() {
  const { id } = useParams();

  const { response: serviceData, loading } = useFetch<ServiceDetail>(
    `/services/${id}`
  );

  console.log(loading);

  if (loading || !serviceData) {
    return (
      <div className="w-full h-screen">
        <CircularLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <ImageCarousel images={serviceData?.image} />
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 capitalize">
                      {serviceData.title}
                    </h1>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="capitalize">
                          {serviceData.location}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Eye className="w-4 h-4 mr-1" />
                        <span>{serviceData.view} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{serviceData.price}
                    </div>
                    <div className="text-sm text-gray-500">per service</div>
                  </div>
                </div>

                <div className="mt-6">
                  <AddToCartButton />
                </div>

                <div className="flex items-center mt-6 p-4 bg-gray-50 rounded-lg">
                  {/* <img
                    src={serviceData.providerId.}
                    alt="Provider"
                    className="w-12 h-12 rounded-full object-cover"
                  /> */}
                  <div className="ml-4">
                    <div className="text-sm text-gray-500">
                      Service Provider
                    </div>
                    <div className="text-gray-900">
                      {serviceData.providerId.email}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    About this service
                  </h2>
                  <p className="mt-2 text-gray-600">
                    {serviceData.description}
                  </p>
                </div>

                {serviceData.ratings.length > 0 && (
                  <div className="mt-8 border-t pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          Ratings & Reviews
                        </h2>
                        <div className="flex items-center mt-2">
                          <StarRating
                            rating={serviceData.ratingAvg[0].avgRating}
                          />
                          <span className="ml-2 text-gray-600">
                            {serviceData.ratingAvg[0].avgRating.toFixed(1)} (
                            {serviceData.ratingAvg[0].totalRating} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-6">
                      {serviceData.ratings.map((review, index) => (
                        <div
                          key={index}
                          className="border-b pb-6 last:border-b-0"
                        >
                          <div className="flex items-center">
                            <img
                              src={review.userId.profilePicture}
                              alt={review.userId.email}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {review.userId.email}
                              </div>
                              <StarRating rating={review.rating} />
                            </div>
                          </div>
                          <p className="mt-2 text-gray-600">
                            {review.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Items Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Related Services
              </h2>
              <div className="space-y-4">
                {relatedItems.map((item) => (
                  <RelatedItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
