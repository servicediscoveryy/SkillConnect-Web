import React, { useState, useEffect } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import Logo from "../../assets/logo/Logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/user.context";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchResult";
import Location from "./Location";
import api from "../../requests/axiosConfig/api";
import { searchData } from "../../constant/types";

// Main NavBar Component
const NavBar: React.FC = () => {
  const { user, fetchCartCount, cartCount } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<searchData[]>([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartCount();
  }, [user]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        const response = await api.get(
          `/services/search-suggestion?query=${query}`
        );
        setSearchResult(response.data);
      } else {
        setSearchResult([]);
      }
    }, 300); // ✅ Waits 300ms before making the API call

    return () => clearTimeout(delayDebounceFn); // ✅ Clears timeout if query changes quickly
  }, [query]);

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
          <DesktopNav user={user} navigate={navigate} cartCount={cartCount} />

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden p-2 cursor-pointer">
            <div className="relative" onClick={() => navigate("/cart")}>
              <ShoppingCart />
              <div className="absolute -top-2 right-0 text-xs bg-red-400 rounded-full p-0.5 px-1">
                {cartCount}
              </div>
            </div>
            <button
              className="md:hidden p-2 focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <>
                  <Menu className="w-6 h-6" />
                </>
              )}
            </button>
          </div>
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
