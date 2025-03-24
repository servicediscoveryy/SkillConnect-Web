import { ServiceData } from "../../constant/types";
import { FeatureVerticalCard } from "../Cards/ServiceCards";
import CircularLoader from "../CircularLoader";
const TopServices = ({ data }: { data: ServiceData[] }) => {
  console.log(data);
  return (
    <div>
      <div className="text-center title"> Top Picks</div>
      <div className="flex justify-between gap-4 overflow-x-scroll hide-scrollbar my-3 p-4 bg-white">
        {data.map((service, index) => (
          <FeatureVerticalCard service={service} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TopServices;
