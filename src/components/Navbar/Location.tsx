import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

// Location Component
const Location: React.FC = () => {
  const [location, setLocation] = useState("Fetching location...");
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(
            `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`
          );
        },
        () => setLocation("Location access denied")
      );
    }
  }, []);

  return (
    <div className="text-sm text-gray-600 flex items-center mt-2">
      <MapPin className="w-5 h-5 mr-1 text-[#2874f0]" /> {location}
    </div>
  );
};

export default Location;
