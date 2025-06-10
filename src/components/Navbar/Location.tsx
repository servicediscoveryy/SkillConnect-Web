// src/components/LocationDisplay.tsx
import { MapPin } from "lucide-react";
import React from "react";
import { useLocationContext } from "../../context/useLocationContext";

const LocationDisplay: React.FC = () => {
  const { location, fetchLocation, isFetching } = useLocationContext();

  // If you want a “refresh” icon/button to re-fetch location:
  // <MapPin onClick={() => fetchLocation()} ... />

  let displayText = "Fetching location...";
  if (location) {
    // You might only show the last few segments as in your original:
    const parts = location.address.split(",");
    const lastSegments = parts.slice(-4).join(","); // adjust count as desired
    displayText = lastSegments;
  }

  return (
    <div className="text-xs text-gray-600 flex items-center mt-2">
      <MapPin
        className="w-4 h-4 mr-1 text-[#2874f0] cursor-pointer"
        onClick={() => fetchLocation()}
      />
      {isFetching ? "Updating..." : displayText}
      {location && !isFetching && (
        <div className="ml-2 text-[10px] text-gray-400">
          ({location.lat.toFixed(2)}, {location.lon.toFixed(2)})
        </div>
      )}
    </div>
  );
};

export default LocationDisplay;
