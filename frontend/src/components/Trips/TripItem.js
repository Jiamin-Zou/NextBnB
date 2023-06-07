import { useHistory } from "react-router-dom";
import format from "date-fns/format";
import sampleHouse from "../../assets/images/sample_house.jpg";
import "./TripItem.css";
import { convertToDate } from "../../util/util";
import { useDispatch } from "react-redux";
import { deleteReservation } from "../../store/reservations";
import ImageLoader from "../../util/ImageLoader";
import { useModal } from "../../context/ModalContext";

const TripItem = ({ trip, type }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const startDate = convertToDate(trip.reservation.startDate);
  const endDate = convertToDate(trip.reservation.endDate);
  const { setToggleEditModal, setTripToUpdate } = useModal();

  const formatDate = (date) => {
    return format(date, "MMM dd, yy");
  };

  const tripRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;

  const toListing = () => {
    history.push(`/listings/${trip.listing.id}`);
  };

  const toUpdate = () => {
    setTripToUpdate(trip)
    setToggleEditModal(true)
  };

  const toCancel = () => {
    dispatch(deleteReservation(trip.reservation.id));
  };

  let buttonGroup;
  switch (type) {
    case "past":
      buttonGroup = (
        <>
          <button className="res-btn">Review</button>
        </>
      );
      break;
    case "current":
      buttonGroup = (
        <>
          <button className="res-btn" onClick={toListing}>
            To Listing
          </button>
        </>
      );
      break;
    case "future":
      buttonGroup = (
        <>
          <button className="res-btn" onClick={toUpdate}>
            Update
          </button>
          <button className="res-btn" onClick={toCancel}>
            Cancel
          </button>
        </>
      );
      break;
    default:
      buttonGroup = <></>;
  }

  return (
    <div className="trip-item">
      <div className="trip-item-left">
        <ImageLoader
          className={"trip-img"}
          onClick={toListing}
          src={
            trip.listing.photoUrls.length > 0
              ? trip.listing.photoUrls[0]
              : sampleHouse
          }
          alt="listing-banner-img"
        />
      </div>
      <div className="trip-item-right">
        <div className="trip-info">
          <div className="trip-location" onClick={toListing}>
            {trip.listing.city}, {trip.listing.state}
          </div>
          <div className="trip-title">{trip.listing.title}</div>
          <div className="trip-dates">{tripRange}</div>
          <div className="trip-guests">
            Guests: {trip.reservation.numGuests}
          </div>
          <div className="trip-price">
            Total: ${trip.reservation.totalPrice.toFixed(2)}
          </div>
        </div>
        <div className="button-group">{buttonGroup}</div>
      </div>
    </div>
  );
};

export default TripItem;
