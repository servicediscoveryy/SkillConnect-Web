import topPopular from "../../constant/data/topPopular.json";
import { ImageRating } from "../Cards/ServiceCards";
const PopularArea = () => {
  return (
    <>
      <h1 className="text-center title">Popular Service in Our Area</h1>
      <div className="flex justify-between gap-4 overflow-x-scroll hide-scrollbar my-3 p-2 bg-white">
        {topPopular.data.map((service, index) => (
          <ImageRating service={service} key={index} />
        ))}
      </div>
    </>
  );
};

export default PopularArea;
