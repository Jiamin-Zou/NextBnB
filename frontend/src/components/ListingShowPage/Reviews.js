import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingReviews, getListingReviews } from "../../store/reviews";
import "./Review.css"

const Reviews = ({ listing }) => {
  const dispatch = useDispatch();
  const listingReviews = useSelector(getListingReviews(listing.id));

  const ratingTitle = [
    "cleanliness",
    "accuracy",
    "communication",
    "location",
    "checkIn",
    "value",
  ];

  useEffect(() => {
    dispatch(fetchListingReviews(listing.id));
  }, []);

  if (!listingReviews) return null;

  const ratingFields = ratingTitle.map((rating) => {
    return (
      <div className="rating-field-item" key={rating}>
        <div className="rating-field-left field-name">{rating.charAt(0).toUpperCase() + rating.slice(1)}</div>
        <div className="rating-field-right">
          <div className="rating-bar outter">
            <div className="rating-bar inner" style={{ width: `calc(${listing.ratings[rating]/5} * 100%)`}}></div>
          </div>
          <div className="rating-field-average">{listing.ratings[rating]}</div>
        </div>
      </div>
    );
  });

  const reviewsCards = listingReviews.map((review) => {})

  return (
    <div className="listing-review-container">
      <div className="listing-average-ratings">{ratingFields}</div>
    </div>
  );
};

export default Reviews;
