import React from "react";
import { Star, MapPin, SlidersHorizontal, X } from "lucide-react";
import StarRating from "../../components/StarRating";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../../utils/slug";

interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  image: string[];
  avgRating: number;
  ratingCount: number;
  category: {
    category: string;
  };
}

const Category = () => {
  const navigate = useNavigate();
  const initialState = {
    priceRange: [0, 1000] as [number, number],
    category: "all",
    location: "all",
    rating: 0,
    sort: "recommended",
  };

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

  const services: Service[] = [
    {
      _id: "67db14bdc923fd2c98491f3f",
      title: "cooking service",
      description: "making the paneer and meat",
      price: 400,
      location: "pune",
      image: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
      ],
      avgRating: 3.8,
      ratingCount: 4,
      category: {
        category: "electrician",
      },
    },
    {
      _id: "67db14bdc923fd2c98491f3f",
      title: "cooking service",
      description: "making the paneer and meat",
      price: 400,
      location: "pune",
      image: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
      ],
      avgRating: 3.8,
      ratingCount: 4,
      category: {
        category: "electrician",
      },
    },
    {
      _id: "67db14bdc923fd2c98491f3f",
      title: "cooking service",
      description: "making the paneer and meat",
      price: 400,
      location: "pune",
      image: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
      ],
      avgRating: 3.8,
      ratingCount: 4,
      category: {
        category: "electrician",
      },
    },
    {
      _id: "67db14bdc923fd2c98491f3f",
      title: "cooking service",
      description: "making the paneer and meat",
      price: 400,
      location: "pune",
      image: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
      ],
      avgRating: 3.8,
      ratingCount: 4,
      category: {
        category: "electrician",
      },
    },
    {
      _id: "67db14bdc923fd2c98491f3f",
      title: "cooking service",
      description: "making the paneer and meat",
      price: 400,
      location: "pune",
      image: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
      ],
      avgRating: 3.8,
      ratingCount: 4,
      category: {
        category: "electrician",
      },
    },
    {
      _id: "67db14bdc923fd2c98491f3f",
      title: "cooking service",
      description: "making the paneer and meat",
      price: 400,
      location: "pune",
      image: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
      ],
      avgRating: 3.8,
      ratingCount: 4,
      category: {
        category: "electrician",
      },
    },

    {
      _id: "67db14bdc923fd2c98491f3f",
      title: "cooking service",
      description: "making the paneer and meat",
      price: 400,
      location: "pune",
      image: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
      ],
      avgRating: 3.8,
      ratingCount: 4,
      category: {
        category: "electrician",
      },
    },
    {
      _id: "67db14bdc923fd2c98491f3f",
      title: "cooking service",
      description: "making the paneer and meat",
      price: 400,
      location: "pune",
      image: [
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80",
      ],
      avgRating: 5,
      ratingCount: 4,
      category: {
        category: "electrician",
      },
    },
  ];

  const categories = ["all", "electrician", "plumber", "cook", "cleaner"];
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
    .filter(
      (service) =>
        (selectedCategory === "all" ||
          service.category.category === selectedCategory) &&
        (selectedLocation === "all" || service.location === selectedLocation) &&
        service.price >= priceRange[0] &&
        service.price <= priceRange[1] &&
        service.avgRating >= minRating
    )
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
    <div className="bg-white my-3">
      <div className="px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
          >
            <SlidersHorizontal size={20} />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-sm h-fit space-y-6`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                {hasActiveFilters() && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <X size={16} />
                    Clear All
                  </button>
                )}
              </div>

              {/* Sort By */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Sort By</h3>
                <select
                  className="w-full p-2 border rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Category</h3>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Location</h3>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc.charAt(0).toUpperCase() + loc.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full"
                  />
                  <span className="min-w-[3ch]">{minRating}</span>
                </div>
                <div className="mt-2">
                  <StarRating rating={minRating} />
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="w-24 p-2 border rounded-md"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    min={0}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    className="w-24 p-2 border rounded-md"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    min={priceRange[0]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <div
                  onClick={() =>
                    navigate(`/${service._id}/${generateSlug(service.title)}`)
                  }
                  key={service._id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <img
                    src={service.image[0]}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">{service.title}</h3>
                      <span className="text-lg font-semibold">
                        ₹{service.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <MapPin size={16} />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StarRating rating={service.avgRating} />
                        <span className="text-sm text-gray-500">
                          ({service.ratingCount})
                        </span>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
