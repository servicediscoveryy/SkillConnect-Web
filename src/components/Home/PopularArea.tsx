import topPopular from "../../constant/data/topPopular.json";
import { ImageRating } from "../Cards/ServiceCards";
const PopularArea = () => {
  return (
    <div className="flex justify-center gap-4 overflow-x-scroll hide-scrollbar my-3">
      {topPopular.data.map((service, index) => (
        <ImageRating service={service} key={index} />
      ))}
    </div>
  );
};

export default PopularArea;
