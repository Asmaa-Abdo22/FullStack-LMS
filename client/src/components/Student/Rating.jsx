import { useEffect, useState } from "react";

const Rating = ({ userRating, onRate }) => {
  const [rating, setRating] = useState(userRating || 0);
  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };
  useEffect(() => {
    if (userRating) {
      setRating(userRating);
    }
  }, [userRating]);
  return (
    <>
      <div>
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          return (
            <span
              onClick={() => {
                handleRating(starValue);
              }}
              key={index}
              className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
                starValue <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              &#9733;
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Rating;
