import React from "react";
import { ServiceData } from "../../constant/types";
import ServiceCard from "../../components/Category/ServiceCard";
import Filters from "../../components/Category/Filters";
import useFetchData from "../../hooks/useFetchData";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import CircularLoader from "../../components/CircularLoader";

const Category = () => {
  const initialState = {
    priceRange: [0, 1000] as [number, number],
    category: "all",
    location: "all",
    rating: 0,
    sort: "recommended",
  };

  const location = useLocation();

  const [query] = useSearchParams();

  console.log(query);

  const { category = "plumber" } = useParams();

  const [priceRange, setPriceRange] = React.useState<[number, number]>(
    initialState.priceRange
  );

  const [selectedCategory, setSelectedCategory] = React.useState<string>(
    initialState.category
  );
  const [selectedLocation, setSelectedLocation] = React.useState<string>(
    initialState.location
  );
  const [minRating, setMinRating] = React.useState<number>(initialState.rating);
  const [sortBy, setSortBy] = React.useState<string>(initialState.sort);
  const [showFilters, setShowFilters] = React.useState(false);

  const isSearchPage = location.pathname.includes("search");

  const { data: services, loading } = isSearchPage
    ? useFetchData(`/services?${query}`)
    : useFetchData(`/services?category=${category}`);

  // Sample data - replace with your actual data

  const categories = [
    "all",
    "electrician",
    "plumber",
    "cook",
    "cleaner",
    "all",
    "electrician",
    "plumber",
    "cook",
    "cleaner",
  ];
  const locations = ["all", "pune", "mumbai", "delhi"];
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price_low", label: "Price: Low to High" },
    { value: "price_high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "reviews", label: "Most Reviewed" },
  ];

  const clearFilters = () => {
    setPriceRange(initialState.priceRange);
    setSelectedCategory(initialState.category);
    setSelectedLocation(initialState.location);
    setMinRating(initialState.rating);
    setSortBy(initialState.sort);
  };

  const hasActiveFilters = () => {
    return (
      priceRange[0] !== initialState.priceRange[0] ||
      priceRange[1] !== initialState.priceRange[1] ||
      selectedCategory !== initialState.category ||
      selectedLocation !== initialState.location ||
      minRating !== initialState.rating ||
      sortBy !== initialState.sort
    );
  };

  const filteredServices = services
    // @ts-expect-error
    ?.filter(
      (service: ServiceData) =>
        ((selectedCategory === "all" ||
          service.category.category === selectedCategory) &&
          (selectedLocation === "all" ||
            service.location === selectedLocation) &&
          service.price >= priceRange[0] &&
          service.price <= priceRange[1] &&
          service.avgRating) ||
        0 >= minRating
    )
    // @ts-expect-error
    .sort((a, b) => {
      switch (sortBy) {
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "rating":
          return b.avgRating - a.avgRating;
        case "reviews":
          return b.ratingCount - a.ratingCount;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8 bg-white m-3">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <p className="text-gray-600 mt-2">
          Find the perfect service provider for your needs
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={{
            priceRange,
            category: selectedCategory,
            location: selectedLocation,
            rating: minRating,
            sort: sortBy,
          }}
          setFilters={{
            setPriceRange,
            setSelectedCategory,
            setSelectedLocation,
            setMinRating,
            setSortBy,
          }}
          options={{
            categories,
            locations,
            sortOptions,
          }}
          initialState={initialState}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {loading ? (
          <CircularLoader />
        ) : (
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service: ServiceData) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No services found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to find more services
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
