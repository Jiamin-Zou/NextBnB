import { useState, useEffect } from "react";
import "./StarRatingInput.css";
import { ReactComponent as Star } from "../../assets/images/star.svg";

const StarRatingInput = ({ fieldRating, handleChange, fieldTitle }) => {
  const [activeRating, setActiveRating] = useState(fieldRating);

  useEffect(() => setActiveRating(fieldRating), [fieldRating]);

  return (
    <div className="star-field-review">
      <span className="rating-field-title">{fieldTitle}</span>
      <div
        className="rating-input"
        onMouseLeave={() => setActiveRating(fieldRating)}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            className={activeRating >= i ? "filled" : "empty"}
            onMouseEnter={() => setActiveRating(i)}
            onClick={() => handleChange(fieldTitle, i)}
            key={i}
          >
            <Star />
          </div>
        ))}
      </div>
      <div className="rating-num-input">
        <select
          className="num-input-field"
          value={fieldRating}
          onChange={(e) => handleChange(fieldTitle, e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </div>
  );
};

export default StarRatingInput;
