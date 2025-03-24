import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface searchData {
  title: string;
}

// Search Results Component
interface SearchResultsProps {
  results: searchData[];
  query: string;
  isOpen: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  isOpen,
}) => {
  const navigate = useNavigate();
  if (!isOpen || !query || results.length === 0) return null;

  return (
    <div className="absolute bg-white w-full shadow-xl top-10 rounded-lg px-3 z-50">
      {results.map((result, index) => (
        <div
          key={index}
          onClick={() => navigate(`/search?query=${result.title}`)}
          className={`px-4 py-2 ${
            index < results.length - 1
              ? "border-b border-gray-200 cursor-pointer hover:font-bold"
              : ""
          }`}
        >
          {result.title}
        </div>
      ))}
    </div>
  );
};

// Search Bar Component
interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  results: searchData[];
  isMobile?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  setQuery,
  results,
  isMobile = false,
}) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsResultsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => {
    if (query) {
      setIsResultsOpen(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsResultsOpen(true);
  };

  return (
    <div
      ref={searchRef}
      className={`${
        isMobile ? "py-2" : "hidden md:flex flex-1 max-w-2xl mx-4"
      } relative`}
    >
      <div className="flex w-full bg-white rounded-md border focus-within:ring-2 focus-within:ring-blue-400">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search for products, brands and more"
          className="w-full px-4 py-2 text-sm text-gray-700 outline-none rounded-l-md"
        />
        <button className="px-6 text-[#2874f0] hover:bg-gray-100">
          <Search className="w-5 h-5" />
        </button>
      </div>
      <SearchResults results={results} query={query} isOpen={isResultsOpen} />
    </div>
  );
};

export default SearchBar;
