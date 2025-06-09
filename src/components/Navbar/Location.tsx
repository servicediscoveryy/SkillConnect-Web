import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Location: React.FC = () => {
  const [location, setLocation] = useState("Fetching location...");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lon: number;
  } | null>(null);

  const fetchAddress = async (lat: number, lon: number) => {
    try {
      const res = await axios.get(
        "https://nominatim.openstreetmap.org/reverse",
        {
          params: {
            format: "jsonv2",
            lat,
            lon,
          },
          headers: {
            "User-Agent": "serviceDiscovery (tusharshitole6767@email.com)",
          },
        }
      );

      const address = res.data.display_name;
      setLocation(address);
      setCoordinates({ lat, lon });
    } catch (error) {
      setLocation("Unable to fetch address");
      console.error("Reverse geocoding error:", error);
    }
  };

  const updateLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchAddress(latitude, longitude);
        },
        () => {
          console.warn("Location access denied. Falling back to Pune.");
          fetchAddress(18.5204, 73.8567);
        }
      );
    } else {
      console.warn("Geolocation not supported. Using Pune as default.");
      fetchAddress(18.5204, 73.8567);
    }
  };

  useEffect(() => {
    updateLocation(); // initial fetch
  }, []);

  return (
    <div className="text-xs text-gray-600 flex items-center mt-2">
      <MapPin
        className="w-4 h-4 mr-1 text-[#2874f0] cursor-pointer"
        onClick={updateLocation}
        // title="Click to refresh location"
      />
      {location.split(",").splice(-4).join(",")}
      {coordinates && (
        <div className="ml-2 text-[10px] text-gray-400">
          ({coordinates.lat.toFixed(2)}, {coordinates.lon.toFixed(2)})
        </div>
      )}
    </div>
  );
};

export default Location;
