import { useEffect, useState } from "react";
import { FeatureVerticalCard } from "../Cards/ServiceCards";
import { ServiceData } from "../../constant/types";
import api from "../../requests/axiosConfig/api";
import { useAuth } from "../../context/user.context";
import CircularLoader from "../CircularLoader";

const Recommend = () => {
  const { user } = useAuth();
  const [data, setData] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const resp = await api.get("/recommend/recommended", {
        withCredentials: true,
      });
      setData(resp.data);

      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <CircularLoader />;
  }

  return (
    <div>
      <div className="text-center title"> Recommended For You</div>
      <div className="flex gap-4 overflow-x-scroll hide-scrollbar my-3 p-4 bg-white">
        {data.map((service, index) => (
          <FeatureVerticalCard
            service={service}
            key={index}
            tag="For You"
          />
        ))}
      </div>
    </div>
  );
};

export default Recommend;
