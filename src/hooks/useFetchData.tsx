import { useEffect, useState } from "react";
import api from "../requests/axiosConfig/api"; // Your Axios instance

interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

const useFetchData = <T,>(endpoint: string) => {
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(endpoint);
        setResponse(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [endpoint]);

  return {
    data: Array.isArray(response)
      ? response
      : (response as ApiResponse<T>)?.data || [],
    loading,
  };
};

export default useFetchData;
