import { ServiceData } from "../../constant/types";
import { FeatureVerticalCard } from "../Cards/ServiceCards";

const TopServices = ({ data }: { data: ServiceData[] }) => {
  return (
    <div>
      <div className="text-center title"> Top Picks</div>
      <div className="flex  gap-4 overflow-x-scroll hide-scrollbar my-3 p-4 bg-white">
        {data.map((service, index) => (
          <FeatureVerticalCard service={service} key={index} tag="Top"/>
        ))}
      </div>
    </div>
  );
};

export default TopServices;
