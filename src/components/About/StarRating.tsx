import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, index) => {
        const isFilled = index < Math.floor(rating);
        const isHalfFilled = index < rating && index >= Math.floor(rating);

        return (
          <div key={index} className="relative">
            <Star
              className={`${sizeClasses[size]} text-gray-200 transition-colors duration-200`}
            />
            <Star
              className={`${
                sizeClasses[size]
              } absolute top-0 left-0 transition-all duration-200 ${
                isFilled
                  ? "text-yellow-400 fill-yellow-400"
                  : isHalfFilled
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-transparent"
              }`}
              style={
                isHalfFilled
                  ? { clipPath: `inset(0 ${100 - (rating % 1) * 100}% 0 0)` }
                  : undefined
              }
            />
          </div>
        );
      })}
      {showNumber && (
        <span className="ml-1 text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
