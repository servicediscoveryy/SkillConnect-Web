// src/context/LocationContext.tsx

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

// 1️⃣ Define the Location data type
export interface LocationData {
  lat: number;
  lon: number;
  address: string; // e.g. full display name from reverse geocoding
}

// 2️⃣ Context type
interface LocationContextType {
  location: LocationData | null;
  fetchLocation: () => Promise<void>;
  isFetching: boolean;
}

// 3️⃣ Default values
const defaultLocationContext: LocationContextType = {
  location: null,
  fetchLocation: async () => {},
  isFetching: false,
};

// 4️⃣ Create Context
const LocationContext = createContext<LocationContextType>(
  defaultLocationContext
);

// 5️⃣ Provider component
export const LocationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  // Optional: cache key & max age (ms)
  const CACHE_KEY = "user_location_cache";
  const CACHE_MAX_AGE = 1000 * 60 * 10; // e.g., 10 minutes

  // Helper: read cached location from localStorage (if any)
  const getCachedLocation = (): LocationData | null => {
    try {
      const item = localStorage.getItem(CACHE_KEY);
      if (!item) return null;
      const parsed = JSON.parse(item) as {
        data: LocationData;
        timestamp: number;
      };
      if (Date.now() - parsed.timestamp < CACHE_MAX_AGE) {
        return parsed.data;
      }
    } catch (e) {
      console.warn("Failed to parse cached location", e);
    }
    return null;
  };

  // Helper: cache location
  const cacheLocation = (data: LocationData) => {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data, timestamp: Date.now() })
      );
    } catch (e) {
      console.warn("Failed to cache location", e);
    }
  };

  // Reverse-geocoding function (Nominatim)
  const fetchAddress = async (lat: number, lon: number): Promise<string> => {
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
            // Provide a valid User-Agent as per Nominatim policy
            "User-Agent": "serviceDiscovery (tusharshitole6767@email.com)",
          },
        }
      );
      // You might choose which part of display_name to store; here we take full.
      return res.data.display_name as string;
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return "Unknown location";
    }
  };

  // Main fetchLocation function
  const fetchLocation = async () => {
    // First, check if we have a recent cached location
    const cached = getCachedLocation();
    if (cached) {
      setLocation(cached);
      return;
    }

    // Otherwise, attempt geolocation. Use Permissions API if available.
    if (!("geolocation" in navigator)) {
      console.warn("Geolocation not supported; using default fallback");
      // Fallback coords (e.g., Pune)
      const lat = 18.5204;
      const lon = 73.8567;
      const address = await fetchAddress(lat, lon);
      const data: LocationData = { lat, lon, address };
      setLocation(data);
      cacheLocation(data);
      return;
    }

    // If Permissions API is available, check status first to avoid unnecessary prompt
    let permissionState: PermissionState | null = null;
    if ("permissions" in navigator) {
      try {
        // @ts-ignore: some TS defs may require name: 'geolocation'
        const status = await (navigator as any).permissions.query({
          name: "geolocation",
        });
        permissionState = status.state; // "granted", "prompt", or "denied"
        // You can also listen for changes: status.onchange = ...
      } catch (e) {
        console.warn("Permissions.query for geolocation failed:", e);
      }
    }

    // If denied, skip prompt
    if (permissionState === "denied") {
      console.warn("Geolocation permission previously denied; using fallback");
      const lat = 18.5204;
      const lon = 73.8567;
      const address = await fetchAddress(lat, lon);
      const data: LocationData = { lat, lon, address };
      setLocation(data);
      cacheLocation(data);
      return;
    }

    // If granted or prompt, proceed to getCurrentPosition
    setIsFetching(true);
    return new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const address = await fetchAddress(latitude, longitude);
          const data: LocationData = { lat: latitude, lon: longitude, address };
          setLocation(data);
          cacheLocation(data);
          setIsFetching(false);
          resolve();
        },
        async (error) => {
          console.warn("Location access denied or error:", error);
          // Fallback
          const lat = 18.5204;
          const lon = 73.8567;
          const address = await fetchAddress(lat, lon);
          const data: LocationData = { lat, lon, address };
          setLocation(data);
          cacheLocation(data);
          setIsFetching(false);
          resolve();
        }
      );
    });
  };

  // Optionally: fetch on mount automatically (once)
  useEffect(() => {
    // You might choose to call fetchLocation() immediately on provider mount,
    // or only call when some component explicitly calls fetchLocation through context.
    // For example, auto-fetch once:
    fetchLocation().catch((err) => {
      console.error("Error in initial fetchLocation:", err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocationContext.Provider value={{ location, fetchLocation, isFetching }}>
      {children}
    </LocationContext.Provider>
  );
};

// 6️⃣ Custom hook for consuming
export const useLocationContext = () => useContext(LocationContext);
