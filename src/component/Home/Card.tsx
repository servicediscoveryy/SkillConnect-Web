const BusinessCard =
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
