import { useEffect, useState } from "react";
import api from "../../requests/axiosConfig/api";
import { ServiceData, ServiceDetail } from "../../constant/types";
import BuyTogether from "./BuyTogether";

const RelatedAssociate = ({ service }: { service: ServiceDetail }) => {
  const [associatedService, setAssociatedService] =
    useState<ServiceDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Requested service:", service);

    async function getService() {
      try {
        const response = await api.get(
          `/recommend/related/${encodeURIComponent(service.title)}`
        );
        console.log(response);
        const recommendations: ServiceDetail[] = response.data;

        console.log(recommendations);
        if (recommendations.length > 0) {
          setAssociatedService(recommendations[0]);
        }
      } catch (err: any) {
        console.error("Failed to fetch related services", err);
        setError("Something went wrong while fetching data.");
      }
    }

    getService();
  }, [service]);

  return (
    <div className="my-5">
      {associatedService?.title && (
        <BuyTogether
          primaryService={service}
          relatedService={associatedService}
        />
      )}
    </div>
  );
};

export default RelatedAssociate;
