// import axios from "axios";
// import { ImageRatingData } from "../../constant/types";
// import { ImageRating } from "../Cards/ServiceCards";
// import { BASEURL } from "../../constant";
// import { useEffect, useState } from "react";

// const PopularArea = ({ data }: { data: ImageRatingData[] }) => {

//   const [clickedService, setClickedService] = useState(null);

//   // Function to handle click
//   const handleServiceClick = (service: any) => {
//     setClickedService(service); // Trigger useEffect
//   };

//   // Effect runs when clickedService changes
//   useEffect(() => {
//     const recordInteraction = async () => {
//       if (!clickedService) return;

//       try {
//         const response = await axios.post(BASEURL + "/api/v1/recommend/record", {
//           // @ts-ignore
//           serviceId: clickedService._id,
//           actionType: "view",

//         }, {
//           withCredentials: true
//         });

//         console.log("Interaction recorded:", response.data);
//       } catch (error: any) {
//         console.error("Error recording interaction:", error.response?.data || error.message);
//       }
//     };

//     recordInteraction();
//   }, [clickedService]); // re-run if new service is clicked


//   return (
//     <>
//       <h1 className="text-center title">Popular Service in Our Area</h1>
//       <div className="flex justify-between gap-4 overflow-x-scroll hide-scrollbar my-3 p-2 bg-white">
//         {data.map((service) => (
//           <ImageRating onClick={(): void => { setClickedService(service) }} service={service} key={service._id} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default PopularArea;
import axios from "axios";
import { ImageRatingData } from "../../constant/types";
import { ImageRating } from "../Cards/ServiceCards";
import { BASEURL } from "../../constant";
import { useEffect, useState } from "react";

const PopularArea = ({ data }: { data: ImageRatingData[] }) => {
  const [clickedService, setClickedService] = useState<ImageRatingData | null>(null);
  console.log("this is the clickedService")

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
