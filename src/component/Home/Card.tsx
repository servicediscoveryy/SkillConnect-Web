const BusinessCard =
//  ({}) => (
//     <div className="flex items-center justify-center  bg-gray-100">
//     <div className="max-w-sm rounded overflow-hidden shadow-lg  bg-white">
//       <img
//         src="https://storage.googleapis.com/a1aa/image/wHWieDGNUdVDBwvgTMmVycHc1JXgJca0e6UzmHfcEXU.jpg"
//         alt="A desk with a laptop, a lamp, and a plant in a pot"
//         className="w-full"
//         width="600"
//         height="400"
//       />
//       <div className="px-6 py-4">
//         <div className="font-bold text-xl mb-2">Noteworthy technology acquisitions 2021</div>
//         <p className="text-gray-700 text-base">
//           Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
//         </p>
//       </div>
//     </div>
//   </div>
// );
({
  profileImage = "https://storage.googleapis.com/a1aa/image/wHWieDGNUdVDBwvgTMmVycHc1JXgJca0e6UzmHfcEXU.jpg",
  providerName = "Service Provider Name",
  serviceTitle = "Service Title",
  description = "No description available.",
  rating = "N/A",
}) => (
  <div className="flex items-center justify-center bg-gray-100">
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        src={profileImage}
        alt={providerName}
        className="w-full"
        width="300"
        height="100"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{providerName}</div>
        <div className="text-lg text-gray-900 mb-2">{serviceTitle}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <div className="mt-4">
          <span className="text-yellow-500 font-bold">
            {rating !== "N/A" ? `${rating} ★` : "No Ratings"}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default BusinessCard;
