import { ImageRatingData } from "../../constant/types";
import { ImageRating } from "../Cards/ServiceCards";

const PopularArea = ({ data }: { data: ImageRatingData[] }) => {
  return (
    <>
      <h1 className="text-center title">Popular Service in Our Area</h1>
      <div className="flex justify-between gap-4 overflow-x-scroll hide-scrollbar my-3 p-2 bg-white">
        {data.map((service) => (
          <ImageRating service={service} key={service._id} />
        ))}
      </div>
    </>
  );
};

export default PopularArea;
