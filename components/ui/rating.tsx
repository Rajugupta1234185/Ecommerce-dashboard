type RatingProps = {
  rate: number;
  count: number;
  className?: string;
};

export function Rating({ rate, count, className = "" }: RatingProps) {
  return (
    <span
      role="img"
      className={className}
      aria-label={`Rated ${rate} out of 5 from ${count} reviews`}
    >
      <span aria-hidden="true" className="text-rating">
        ★
      </span>{" "}
      {rate} ({count})
    </span>
  );
}