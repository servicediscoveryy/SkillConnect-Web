import { useEffect, useState } from "react";
import api from "../requests/axiosConfig/api";

interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
}

export const useFetch = <T = any,>(endpoint: string) => {
  const [response, setResponse] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get<ApiResponse<T>>(endpoint);

        console.log(res);

        //@ts-expect-error
        setResponse(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [endpoint]);

  return { response: response?.data, loading };
};
