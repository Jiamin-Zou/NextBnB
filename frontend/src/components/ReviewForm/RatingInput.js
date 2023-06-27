import { useState, useEffect } from "react";
import { ReactComponent as Star } from "../../assets/images/star.svg";

const StarRatingInput = (rating, disabled, onChange, fieldTitle) => {
  const [activeRating, setActiveRating] = useState(rating);

  useEffect(() => setActiveRating(rating), [rating]);

  return (
    <>
      <span className="rating-field-title">{fieldTitle + ":"}</span>
      <div
        className="rating-input"
        onMouseLeave={() => setActiveRating(rating)}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            className={activeRating >= i ? "filled" : "empty"}
            onMouseEnter={() => (disabled ? null : setActiveRating(i))}
            onClick={() => onChange(fieldTitle, i)}
          >
            <Star />
          </div>
        ))}
      </div>
      <input
        className="rating-num-input"
        type="number"
        disabled={disabled}
        value={rating}
        onChange={onChange}
        min="1"
        max="5"
      />
    </>
  );
};

export default StarRatingInput;
