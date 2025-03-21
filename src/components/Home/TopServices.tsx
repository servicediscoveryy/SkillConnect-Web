import { FeatureVerticalCard } from "../Cards/ServiceCards";
import topPopular from "../../constant/data/topPopular.json";
const TopServices = () => {
  return (
    <div>
      <div className="text-center title"> Top Picks</div>
      <div className="flex justify-between gap-4 overflow-x-scroll hide-scrollbar my-3 p-4 bg-white">
        {topPopular.data.map((service, index) => (
          <FeatureVerticalCard service={service} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TopServices;
