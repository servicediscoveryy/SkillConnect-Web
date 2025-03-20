import React from "react";
import { Wrench, Zap, ChefHat, Wind, Hammer } from "lucide-react";
import { ElegantVerticalCard } from "../Cards/ServiceCards";

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

interface Category {
  _id: string;
  category: string;
  services: ServiceData[];
}

interface CategoryWiseServicesProps {
  data: Category[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "plumber":
      return <Wrench className="w-6 h-6" />;
    case "electrician":
      return <Zap className="w-6 h-6" />;
    case "cheif":
    case "chef":
      return <ChefHat className="w-6 h-6" />;
    case "a/c repairer":
      return <Wind className="w-6 h-6" />;
    case "carpainter":
    case "carpenter":
      return <Hammer className="w-6 h-6" />;
    default:
      return <Wrench className="w-6 h-6" />;
  }
};

const CategoryWiseServices: React.FC<CategoryWiseServicesProps> = ({
  data,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No services available at the moment.
      </div>
    );
  }

  return (
    <div className="my-2">
      <h1 className="title my-3 text-center">Our Service Categories</h1>

      <div className="space-y-3">
        {data.map((category) => (
          <div
            key={category._id}
            className="bg-white rounded-2xl shadow-sm p-6 w-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                {getCategoryIcon(category.category)}
              </div>
              <div className="w-full flex items-center justify-between">
                <h2 className="subTitle ">{category.category}</h2>
                <h2 className="hover-effect px-2 py-2">See All</h2>
              </div>
            </div>

            {category?.services?.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No services available in this category yet.
              </p>
            ) : (
              <div className="w-full">
                <div className="overflow-x-auto hide-scrollbar -mx-6">
                  <div className="inline-flex gap-6 px-6 py-2 min-w-full w-max">
                    {category.services.map((service) => (
                      <ElegantVerticalCard service={service} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryWiseServices;
