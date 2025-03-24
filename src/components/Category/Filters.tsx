import { X, SlidersHorizontal } from "lucide-react";
import StarRating from "../StarRating";

interface FiltersProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filters: {
    priceRange: [number, number];
    category: string;
    location: string;
    rating: number;
    sort: string;
  };
  setFilters: {
    setPriceRange: (range: [number, number]) => void;
    setSelectedCategory: (category: string) => void;
    setSelectedLocation: (location: string) => void;
    setMinRating: (rating: number) => void;
    setSortBy: (sort: string) => void;
  };
  options: {
    categories: string[];
    locations: string[];
    sortOptions: { value: string; label: string }[];
  };
  initialState: {
    priceRange: [number, number];
    category: string;
    location: string;
    rating: number;
    sort: string;
  };
  clearFilters: () => void;
  hasActiveFilters: () => boolean;
}

const Filters = ({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  options,
  initialState,
  clearFilters,
  hasActiveFilters,
}: FiltersProps) => {
  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>
      </div>

      <div
        className={`${
          showFilters ? "block" : "hidden"
        } lg:block w-full lg:w-1/4 bg-white p-6 rounded-xl shadow-sm h-fit space-y-6 border border-gray-100`}
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
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

          <div className="space-y-6">
            {/* Sort By */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Sort By
              </h3>
              <select
                className="w-full p-2.5 border rounded-lg bg-white hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={filters.sort}
                onChange={(e) => setFilters.setSortBy(e.target.value)}
              >
                {options.sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Category
              </h3>
              <select
                className="w-full p-2.5 border rounded-lg bg-white hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={filters.category}
                onChange={(e) => setFilters.setSelectedCategory(e.target.value)}
              >
                {options.categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Location
              </h3>
              <select
                className="w-full p-2.5 border rounded-lg bg-white hover:border-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={filters.location}
                onChange={(e) => setFilters.setSelectedLocation(e.target.value)}
              >
                {options.locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc.charAt(0).toUpperCase() + loc.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.rating}
                    onChange={(e) =>
                      setFilters.setMinRating(Number(e.target.value))
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <span className="min-w-[3ch] text-gray-600">
                    {filters.rating}
                  </span>
                </div>
                <StarRating rating={filters.rating} />
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Price Range
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="w-24 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    setFilters.setPriceRange([
                      Number(e.target.value),
                      filters.priceRange[1],
                    ])
                  }
                  min={0}
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  className="w-24 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters.setPriceRange([
                      filters.priceRange[0],
                      Number(e.target.value),
                    ])
                  }
                  min={filters.priceRange[0]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
