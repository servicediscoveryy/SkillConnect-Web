import StarRating from "./StarRating";

export default function ReviewCard({ review }: any) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start gap-4">
        <img
          src={review.userId.profilePicture}
          alt={review.userId.email}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
        />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900">
                {review.userId.email}
              </h4>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
            <StarRating rating={review.rating} size="sm" />
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">
            {review.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors duration-200">
              <span>👍</span>
              <span>Helpful</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
