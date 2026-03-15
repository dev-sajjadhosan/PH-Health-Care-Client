import { Star, StarHalf } from "lucide-react";

export default function RatingCeil({ rating }: { rating: number }) {
  const cappedRating = Math.min(Math.max(rating, 0), 5);
  const fullStarsCount = Math.floor(cappedRating);
  const hasHalfStar = cappedRating % 1 !== 0 && fullStarsCount < 5;
  const emptyStarsCount =
    cappedRating === 0
      ? 5
      : cappedRating - fullStarsCount - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStarsCount  }).map((_, index) => (
        <Star
          key={`full-${index}`}
          className="h-4 w-4 fill-primary stroke-primary"
        />
      ))}
      {hasHalfStar && (
        <StarHalf key="half" className="h-4 w-4 fill-primary stroke-primary" />
      )}
      {Array.from({ length: emptyStarsCount }).map((_, index) => (
        <Star
          key={`empty-${index}`}
          className="h-4 w-4 fill-gray-300 stroke-gray-300"
        />
      ))}
    </div>
  );
}
