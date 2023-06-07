import { useState, useEffect } from "react";
import { useModal } from "../../context/ModalContext";
import { convertToDate } from "../../util/util";
import format from "date-fns/format";
import { differenceInDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ImageLoader from "../../util/ImageLoader";
import { updateReservation } from "../../store/reservations";
import { useDispatch } from "react-redux";
import "./UpdateReservationModal.css";

const UpdateReservationModal = () => {
  const { setToggleEditModal, tripToUpdate } = useModal();
  const trip = tripToUpdate;

  const dispatch = useDispatch();
  const startDate = convertToDate(trip.reservation.startDate);
  const endDate = convertToDate(trip.reservation.endDate);
  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);
  const [newNumGuests, setNewNumGuests] = useState(trip.reservation.numGuests);
  const [newNumNights, setNewNumNights] = useState(
    differenceInDays(startDate, endDate)
  );
  const [newServiceFee, setNewServiceFee] = useState(0);
  const [errors, setErrors] = useState([]);
  const [newTotal, setNewTotal] = useState(0);
  const nightPrice = trip.listing.nightPrice;
  const cleaningFee = trip.listing.cleaningFee;

  const formatDate = (date) => {
    return format(date, "MMM dd, yy");
  };

  const tripRange = `${formatDate(startDate)} - ${formatDate(endDate)}`;

  const selectionRange = {
    startDate: newStartDate,
    endDate: newEndDate,
    key: "selection",
  };

  const [mousePositions, setMousePositions] = useState({
    update: { x: 0, y: 0 },
  });

  const handleMouseMove = (event, element) => {
    const rect = event.target.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((event.clientY - rect.top) / rect.height) * 100;

    setMousePositions((prevMousePositions) => ({
      ...prevMousePositions,
      [element]: { x: mouseX, y: mouseY },
    }));
  };

  const handleSelect = (ranges) => {
    setNewStartDate(ranges.selection.startDate);
    setNewEndDate(ranges.selection.endDate);
  };

  const validateDates = () => newNumNights >= 1;

  useEffect(() => {
    const calculatedNumNights = differenceInDays(newEndDate, newStartDate);
    const calculatedServiceFee = parseFloat(
      nightPrice * calculatedNumNights * 0.17
    ).toFixed(2);
    const calculatedTotal = (
      nightPrice * calculatedNumNights +
      cleaningFee +
      parseFloat(calculatedServiceFee)
    ).toFixed(2);

    setNewNumNights(calculatedNumNights);
    setNewServiceFee(calculatedServiceFee);
    setNewTotal(calculatedTotal);
  }, [newStartDate, newEndDate]);

  const toTrips = () => {
    setToggleEditModal(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrors([]);

    const dateField = document.querySelector(".trip-new-dates");
    const checkin = document.querySelector(".trip-new-start");
    const checkout = document.querySelector(".trip-new-end");
    dateField.classList.remove("update-error");
    checkin.classList.remove("update-error");
    checkout.classList.remove("update-error");
    if (validateDates()) {
      const reservation = {
        ...trip.reservation,
        listingId: trip.listing.id,
        numGuests: newNumGuests,
        totalPrice: newTotal,
        startDate: format(newStartDate, "yyyy-MM-dd"),
        endDate: format(newEndDate, "yyyy-MM-dd"),
      };
      try {
        await new Promise((resolve, reject) => {
          dispatch(updateReservation(reservation)).then(resolve).catch(reject);
        });
        setToggleEditModal(false);
      } catch (res) {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) {
          setErrors(data.errors);
          dateField.classList.add("update-error");
          checkin.classList.add("update-error");
          checkout.classList.add("update-error");
        } else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    } else {
      setErrors(["Minimum of 1 night required!"]);
      dateField.classList.add("update-error");
      checkin.classList.add("update-error");
      checkout.classList.add("update-error");
    }
  };

  return (
    <div className="update-modal-bg">
      <div className="update-modal-wrapper">
        <div className="update-modal-head">
          <button onClick={toTrips} id="close-btn">
            <div>X</div>
          </button>
        </div>
        <div className="trip-update-modal-container">
          <div className="trip-update-header">
            <h1 className="trip-range update">{tripRange}</h1>
            <div className="trip-details">
              <h3 className="trip-title update">{trip.listing.title}</h3>
              <div className="trip-location update">
                {trip.listing.city}, {trip.listing.state}
              </div>
              <div className="trip-guests update">
                Guests: {trip.reservation.numGuests}
              </div>
            </div>
          </div>
          <div className="trip-img-container update">
            <ImageLoader
              className={"trip-img update"}
              src={trip.listing.photoUrls[0]}
              alt="listing-banner-img"
            />
          </div>
          <div className="trip-date-picker">
            <DateRange
              minDate={new Date()}
              ranges={[selectionRange]}
              onChange={handleSelect}
              months={2}
              direction="horizontal"
              className="update-calender"
            />
          </div>
          <div className="trip-new-dates">
            <div className="trip-dates-wrapper">
              <div className="trip-new-start">
                <div className="start new-tag">NEW CHECK-IN</div>
                <input
                  className="start new-input"
                  placeholder="MM/DD/YYYY"
                  readOnly
                  value={format(newStartDate, "MM/dd/yyyy")}
                />
              </div>
              <div className="trip-new-end">
                <div className="end new-tag">NEW CHECK-OUT</div>
                <input
                  className="end new-input"
                  placeholder="MM/DD/YYYY"
                  readOnly
                  value={format(newEndDate, "MM/dd/yyyy")}
                />
              </div>
            </div>
          </div>

          <div className="trip-new-guests">
            <div className="trip-guest-wrapper">
              <div className="num-guests new-tag">Guests</div>
              <input
                className="num-guests new-input"
                type="number"
                min="1"
                value={newNumGuests}
                onChange={(e) => setNewNumGuests(e.target.value)}
              />
            </div>
          </div>
          {errors.length > 0 && (
            <ul className="err-msg-container">
              {errors.map((error) => (
                <li key={error} className="error err-msg">
                  <i className="fa-solid fa-circle-info"></i> {error}
                </li>
              ))}
            </ul>
          )}
          <div className="trip-new-prices">
            <h2 className="trip-price-header">Updated pricing</h2>
            <div className="price-field">
              <div className="price-calc-line">
                <div>
                  ${nightPrice} x {newNumNights} nights
                </div>
                <div>${nightPrice * newNumNights}</div>
              </div>
              <div className="price-calc-line">
                <div>Cleaning fee</div>
                <div>${cleaningFee}</div>
              </div>
              <div className="price-calc-line">
                <div>NextBnB service fee</div>
                <div>${newServiceFee}</div>
              </div>
              <div className="divisor">
                <hr />
              </div>
              <div className="price-calc-line">
                <div className="total-price">New total before taxes</div>
                <div className="total-price">${newTotal}</div>
              </div>
            </div>
          </div>
          <div className="update-btn-wrapper">
            <button
              className="trip-update-btn"
              id="reserve-btn"
              onClick={handleUpdate}
              style={{
                backgroundPosition: `calc((100 - ${mousePositions.update.x}) * 1%) calc((100 - ${mousePositions.update.y}) * 1%)`,
              }}
              onMouseMove={(e) => handleMouseMove(e, "update")}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateReservationModal;
