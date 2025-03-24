import { Search } from "lucide-react";

// Search Results Component
interface SearchResultsProps {
  results: string[];
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
  if (!query || results.length === 0) return null;

  return (
    <div className="absolute bg-white w-full shadow-xl top-10 rounded-lg px-3 z-50">
      {results.map((result, index) => (
        <div
          key={index}
          className={`px-4 py-2 ${
            index < results.length - 1 ? "border-b" : ""
          }`}
        >
          {result}
        </div>
      ))}
    </div>
  );
};

// Search Bar Component
interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  results: string[];
  isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  results,
  isMobile = false,
}) => {
  return (
    <div
      className={`${
        isMobile ? "py-2" : "hidden md:flex flex-1 max-w-2xl mx-4"
      } relative`}
    >
      <div className="flex w-full bg-white rounded-md border focus-within:ring-2 focus-within:ring-blue-400">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products, brands and more"
          className="w-full px-4 py-2 text-sm text-gray-700 outline-none rounded-l-md"
        />
        <button className="px-6 text-[#2874f0] hover:bg-gray-100">
          <Search className="w-5 h-5" />
        </button>
      </div>
      <SearchResults results={results} query={query} />
    </div>
  );
};

export default SearchBar;
