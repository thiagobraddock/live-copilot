import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onRatingChange, disabled = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starValue) => {
    if (!disabled) {
      onRatingChange(starValue);
    }
  };

  const handleStarHover = (starValue) => {
    if (!disabled) {
      setHoverRating(starValue);
    }
  };

  const handleStarLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          onMouseLeave={handleStarLeave}
          disabled={disabled}
          className={`p-1 transition-colors ${
            disabled ? 'cursor-default' : 'cursor-pointer hover:scale-110'
          } ${
            star <= (hoverRating || rating)
              ? 'text-yellow-400'
              : 'text-gray-300'
          }`}
        >
          <Star
            size={24}
            fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;