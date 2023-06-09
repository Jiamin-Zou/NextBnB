import "./ListingMarker.css";
import ImageLoader from "../../util/ImageLoader";
import { useHistory } from "react-router-dom";
import { ReactComponent as Star } from "../../assets/images/star.svg";

const MarkerInfoCard = ({ listing, onClick }) => {
  const history = useHistory();

  const handleCardClick = () => {
    history.push(`/listings/${listing.id}`);
  };

  const handleClick = () => {
    onClick(listing.id);
  };

  return (
    <div className="marker-info-card">
      <div className="info-card-content">
        <button className="close-info-card" onClick={handleClick}>
          &times;
        </button>
        <div className="info-card-img-container" onClick={handleCardClick}>
          <ImageLoader
            className={"info-card-img"}
            src={listing.photoUrls[0]}
            alt={"map listing info card photo"}
          />
        </div>
        <div className="info-card-detail-container" onClick={handleCardClick}>
          <div className="info-card-location">
            {listing.city}, {listing.state}
          </div>
          <div className="info-card-rating">
            <div className="review-star">
              <Star />
            </div>
            <div className="info-card-rating-score">
              {listing.ratings.overallRating}
            </div>
          </div>
          <div className="info-card-category">
            {listing.category.charAt(0).toUpperCase() +
              listing.category.slice(1)}
          </div>
          <div className="info-card-price">
            ${listing.nightPrice} <span>night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ListingMarker = ({ listing, isActive, onClick }) => {
  const handleClick = () => {
    onClick(listing.id);
  };
  return (
    <div
      className={`list-map-marker ${isActive ? "active-marker" : ""}`}
      onClick={handleClick}
    >
      <div>${listing.nightPrice}</div>
      {isActive && <MarkerInfoCard listing={listing} onClick={onClick} />}
    </div>
  );
};

export default ListingMarker;
