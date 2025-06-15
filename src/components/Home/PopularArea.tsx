import { ImageRatingData } from "../../constant/types";
import { ImageRating } from "../Cards/ServiceCards";

import { useState } from "react";

const PopularArea = ({ data }: { data: ImageRatingData[] }) => {

  //@ts-expect-error
  const [clickedService, setClickedService] = useState<ImageRatingData | null>(
    null
  );
  console.log("this is the clickedService");

  // // Automatically track "view" when a service is clicked
  // useEffect(() => {
  //   if (clickedService) {
  //     recordInteraction(clickedService, "view");
  //   }
  // }, [clickedService]);

  return (
    <>
      <h1 className="text-center title">Popular Service in Our Area</h1>
      <div className="flex justify-between gap-4 overflow-x-scroll hide-scrollbar my-3 p-2 bg-white">
        {data.map((service) => (
          <ImageRating
            key={service._id}
            service={service}
            // @ts-ignore
            onClick={() => setClickedService(service)}
          />
        ))}
      </div>
    </>
  );
};

export default PopularArea;
