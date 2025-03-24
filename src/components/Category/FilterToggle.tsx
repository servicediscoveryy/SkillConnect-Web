// src/components/FilterToggle.tsx
import React from "react";
import { SlidersHorizontal } from "lucide-react";

interface FilterToggleProps {
  onClick: () => void;
}

const FilterToggle: React.FC<FilterToggleProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm lg:hidden"
    >
      <SlidersHorizontal size={20} />
      Filters
    </button>
  );
};

export default FilterToggle;
