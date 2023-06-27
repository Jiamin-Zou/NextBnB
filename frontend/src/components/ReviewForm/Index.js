import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/ModalContext";
import format from "date-fns/format";
import { convertToDate } from "../../util/util";
import "./ReviewForm.css";
import { ReactComponent as Star } from "../../assets/images/star.svg";
import { useState } from "react";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const formatDate = (date) => {
    return format(date, "MMM dd, yy");
  };
  const { setToggleReviewModal, tripData, setTripData } = useModal();
  const startDate = convertToDate(tripData.reservation.startDate);
  const endDate = convertToDate(tripData.reservation.endDate);
  const tripRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;
  const header = !!tripData.reviewData.id
    ? "Update Review"
    : "Write a new Review";

  const [rating, setRating] = useState({
    accuracy: tripData.accuracy,
    checkIn: tripData.checkIn,
    cleanliness: tripData.cleanliness,
    communication: tripData.communication,
    location: tripData.location,
    value: tripData.value,
  });
  const [body, setBody] = useState(tripData.body);

  const handleClose = (e) => {
    e.preventDefault();
    setTripData(null);
    setToggleReviewModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggleReviewModal(false);
  };

  console.log(tripData);

  return (
    <div className="review-modal-bg">
      <div className="review-modal-wrapper">
        <div className="review-modal-head">
          <button onClick={handleClose} id="close-btn">
            <div>X</div>
          </button>
          <h1 className="review-modal-title">{header}</h1>
          <div></div>
        </div>
        <div className="review-reserve-info">
          <div className="review-reserve-info-left">
            <h2>Trip Details: </h2>
            <div className="review-trip-details">
              <span className="review-listing-title">
                {tripData.listing.title}
              </span>
              <span className="review-listing-location">
                {tripData.listing.city}, {tripData.listing.state}
              </span>
              <div className="review-listing-rating">Overall Rating: <Star />{tripData.listing.ratings.overallRating}</div>
              <span className="review-listing-host">
                Hosted by: {tripData.host.firstName} {tripData.host.lastName}
              </span>
            </div>
            <div className="review-reserve-details">
              <span className="review-reservation-dates">{tripRange}</span>
              <span>Guests: {tripData.reservation.numGuests}</span>

            </div>
          </div>
          <div className="review-reserve-info-right">
            <img src={tripData.listing.photoUrls[0]} alt="" />
          </div>
        </div>
        <div className="review-modal-container">ReviewForm</div>
      </div>
    </div>
  );
};

export default ReviewForm;
