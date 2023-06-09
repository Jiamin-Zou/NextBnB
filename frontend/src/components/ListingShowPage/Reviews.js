import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingReviews, getListingReviews } from "../../store/reviews";
import { ReactComponent as Star } from "../../assets/images/star.svg";
import "./Review.css";
import { randomRGB } from "../../util/util";

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
        <div className="rating-field-left field-name">
          {rating.charAt(0).toUpperCase() + rating.slice(1)}
        </div>
        <div className="rating-field-right">
          <div className="rating-bar outter">
            <div
              className="rating-bar inner"
              style={{ width: `calc(${listing.ratings[rating] / 5} * 100%)` }}
            ></div>
          </div>
          <div className="rating-field-average">{listing.ratings[rating]}</div>
        </div>
      </div>
    );
  });

  const reviewCards = listingReviews.map((review) => {
    return (
      <div className="review-card-item" key={review.id}>
        <div className="review-user-field">
          <div className="review-user-left">
            <i className="fa-regular fa-circle-user" style={{color: randomRGB()}}></i>
          </div>
          <div className="review-user-right">
            <div className="review-user-name">{review.reviewer}</div>
            <div className="review-user-rating">{review.overallRating}</div>
          </div>
        </div>
        <div className="review-body-field">
          <div>{review.body}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="listing-review-container">
      <div className="listing-review-header">
        <div className="listing-rating">
          <div className="review-star">
            <Star />
          </div>
          <div className="listing-rating-score">
            {listing.ratings.overallRating}
          </div>
        </div>
        <span className="separator">&#x2022;</span>
        <div id="listing-num-reviews">
          <span id="num-reviews">{listing.numReviews} reviews</span>
        </div>
      </div>
      <div className="listing-average-ratings">{ratingFields}</div>
      <div className="listing-review-cards">{reviewCards}</div>
    </div>
  );
};

export default Reviews;
