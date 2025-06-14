import { useEffect, useState } from "react";
import { Star, MapPin, Eye, Award, User } from "lucide-react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { CategoryType, ServiceDetail } from "../../constant/types";
import CircularLoader from "../../components/CircularLoader";
import api from "../../requests/axiosConfig/api";
import RelatedServiceCard from "../../components/About/RelatedServiceCard";
import ImageCarousel from "../../components/About/ImageCarousel";
import StarRating from "../../components/About/StarRating";
import ReviewCard from "../../components/About/ReviewCard";
import RelatedAssociate from "../../components/About/RelatedAssociate";
import AddToCartButton from "../../components/AddToCartButton";
import toast from "react-hot-toast";
import ReviewModal from "../../components/About/ReviewModal";
import { useAuth } from "../../context/user.context";
import { useLocationContext } from "../../context/useLocationContext";

function About() {
  const { id } = useParams();
  const { location } = useLocationContext();

  const [relatedItems, setReletedItems] = useState([]);

  const [nearServices, setNearServices] = useState([]);

  //@ts-expect-error
  const [nearLoading, setNearLoading] = useState(false);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const { response: serviceData, loading } = useFetch<ServiceDetail>(
    `/services/${id}`
  );

  const { user } = useAuth();

  console.log(location);

  useEffect(() => {
    if (!serviceData?.category) return;

    const fetchRelatedItems = async () => {
      try {
        setNearLoading(true);
        // 1. Get all categories
        const { data: categories } = await api.get<CategoryType[]>("/category");

        // 2. Find category name using the category ID
        const selectedCategory = categories.find(
          (cat) => cat._id === serviceData.category
        );

        console.log(selectedCategory);
        if (!selectedCategory) return;

        const categoryName = selectedCategory.category;

        const response = await api.get(`/services?category=${categoryName}`);

        setReletedItems(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching related items:", error);
      }
    };

    async function fetchNearServices() {
      try {
        const response = await api.get(
          `/recommend/near-services?longitude=${
            location?.lon || 73.8562
          }&latitude=${location?.lat || 18.4963}`,
          {
            params: { categoryId: serviceData?.category },
          }
        );
        console.log(response);
        setNearServices(response.data);

        setNearLoading(false);
      } catch (error) {
        console.error("Error fetching near items:", error);
      }
    }

    fetchRelatedItems().then(() => fetchNearServices());
  }, [serviceData?.category]);

  if (loading || !serviceData) {
    return (
      <div className="w-full h-screen">
        <CircularLoader />
      </div>
    );
  }

  const handleReviewSubmit = async (rating: number, comment: string) => {
    try {
      await api.post(
        `/provider-services/rating/${serviceData._id}`,
        {
          rating,
          description: comment,
        },
        { withCredentials: true }
      );

      toast.success("Review submitted!");
      // Optional: Refetch service details or append new review to UI
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* main container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16">
          <div className="lg:flex">
            {/* Image Section */}
            <div className="lg:w-1/2 p-8">
              <ImageCarousel
                images={serviceData.image}
                alt={serviceData.title}
              />
            </div>

            {/* Details Section */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full mb-3">
                    {serviceData.status}
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                    {serviceData.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-indigo-500" />
                      <span className="font-medium">
                        {serviceData.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-indigo-500" />
                      <span>{serviceData?.view} views</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <StarRating
                        rating={serviceData?.ratingAvg[0]?.avgRating || 0}
                        showNumber
                      />
                      <span className="text-sm">
                        ({serviceData?.ratingAvg[0]?.totalRating} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-6 mb-8">
                <div className="text-4xl font-bold text-gray-900 mb-1">
                  ₹{serviceData.price.toLocaleString()}
                </div>
                <div className="text-gray-600 font-medium">per service</div>
              </div>

              <AddToCartButton serviceId={serviceData?._id} />

              {/* Provider Info */}
              <div className="bg-gray-50 rounded-xl p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Service Provider
                </h3>
                <div className="flex items-center gap-4">
                  {/* <img
                    src={serviceData.provider.avatar}
                    alt={serviceData.provider.name}
                    className="w-16 h-16 rounded-full object-cover ring-4 ring-white"
                  /> */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {serviceData.providerId.email}
                    </h4>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        {/* <span>{serviceData.provider.rating}</span> */}
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {/* <span>{serviceData.providerId.experience}</span> */}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>
                          {/* {serviceData.provider.totalServices} services */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-8 lg:px-12 pb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About this service
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {serviceData.description}
            </p>
          </div>
        </div>

        {/* Related Items Sidebar */}
        {relatedItems.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Related Services
            </h2>
            <div className="flex gap-3 overflow-x-scroll">
              {relatedItems.map((item) => (
                // @ts-expect-error
                <RelatedServiceCard key={item._id} service={item} />
              ))}
            </div>
          </div>
        )}

        {nearServices.length > 0 && (
          <div className="my-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Services Near To You
            </h2>
            <div className="flex gap-3 overflow-x-scroll">
              {nearServices.map((item) => (
                // @ts-expect-error
                <RelatedServiceCard key={item._id} service={item} />
              ))}
            </div>
          </div>
        )}

        <RelatedAssociate service={serviceData} />

        {/* review*/}

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <StarRating
                    rating={serviceData?.ratingAvg[0]?.avgRating || 0}
                    size="lg"
                  />
                  <span className="text-2xl font-bold text-gray-900">
                    {serviceData?.ratingAvg[0]?.avgRating?.toFixed(1) || 0}
                  </span>
                </div>
                <span className="text-gray-600">
                  Based on {serviceData?.ratingAvg[0]?.totalRating || 0} reviews
                </span>
              </div>
            </div>
            {user?.email && (
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Write a Review
              </button>
            )}
          </div>

          <div className="grid gap-6">
            {serviceData?.ratings?.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="border border-gray-300 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 px-8 py-3 rounded-lg font-medium transition-all duration-200">
              Load More Reviews
            </button>
          </div>
        </div>

        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmit={handleReviewSubmit}
        />
      </div>
    </div>
  );
}

export default About;
