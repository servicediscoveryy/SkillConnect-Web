import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "../../assets/logo/Logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/user.context";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchResult";
import Location from "./Location";

// Main NavBar Component
const NavBar: React.FC = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Prevent infinite re-renders
  useEffect(() => {
    if (searchResult.length === 0) {
      setSearchResult([
        "Sample result 1",
        "Sample result 2",
        "Sample result 3",
      ]);
    }
  }, [searchResult]);

  return (
    <nav className="bg-white text-black py-1 px-3">
      <div className="max-w-[95rem] mx-auto">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img src={Logo} alt="SkillLink Logo" className="h-8 w-auto" />
            <span className="text-xl font-bold ml-2">SkillLink</span>
          </a>

          {/* Search Bar - Desktop */}
          <SearchBar query={query} setQuery={setQuery} results={searchResult} />

          {/* Desktop Navigation */}

          {/* @ts-expect-error */}
          <DesktopNav user={user} navigate={navigate} />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            aria-label="Toggle Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden">
          <SearchBar
            query={query}
            setQuery={setQuery}
            results={searchResult}
            isMobile
          />
          <Location />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </nav>
  );
};

export default NavBar;
