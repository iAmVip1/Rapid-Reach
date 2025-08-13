import { useState } from "react";

const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(0);
  
  // Handle star hover and click
  const handleMouseEnter = (index) => setRating(index);
  const handleMouseLeave = () => setRating(0);
  const handleClick = (index) => setRating(index);

  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: totalStars }, (_, index) => (
        <svg
          key={index}
          className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
            index < rating
              ? "text-yellow-400"
              : index < rating + 1
              ? "text-yellow-300"
              : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
          onMouseEnter={() => handleMouseEnter(index + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index + 1)}
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
      ))}
      <span className="ml-2 text-lg font-semibold">{rating}</span>
    </div>
  );
};

export default StarRating;
