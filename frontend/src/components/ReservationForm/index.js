import { useModal } from "../../context/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import ReservationCalendar from "../ReservationCalendar";
import { useState, useEffect } from "react";
import "./ReservationForm.css";
import format from "date-fns/format";
import { createReservation } from "../../store/reservations";
import { differenceInDays } from "date-fns";
import { useHistory } from "react-router-dom";
import { ReactComponent as Star } from "../../assets/images/star.svg";

const Reservation = ({
  listing,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  calendarOpen,
  setCalendarOpen,
  blockedDates,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setToggleModal } = useModal();
  const currentUser = useSelector((state) => state.session.currentUser);
  const [numGuests, setNumGuests] = useState(1);
  const [numNights, setNumNights] = useState(1);
  const [serviceFee, setServiceFee] = useState(0);
  const [errors, setErrors] = useState([]);
  const [total, setTotal] = useState(0);
  const nightPrice = listing.nightPrice;
  const cleaningFee = listing.cleaningFee;
  const [mousePositions, setMousePositions] = useState({
    reserve: { x: 0, y: 0 },
    login: { x: 0, y: 0 },
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
  const validateDates = () => numNights >= 1;

  const handleReserve = async (e) => {
    e.preventDefault();
    setErrors([]);

    const inputField = document.querySelector(".input-fields");
    const dateField = document.querySelector(".date-fields");
    const checkin = document.querySelector(".check-in-field");
    const checkout = document.querySelector(".check-out-field");
    inputField.classList.remove("date-error");
    dateField.classList.remove("date-error");
    checkin.classList.remove("date-error");
    checkout.classList.remove("date-error");
    if (validateDates()) {
      const reservation = {
        listingId: listing.id,
        numGuests,
        totalPrice: total,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
      };
      try {
        await new Promise((resolve, reject) => {
          dispatch(createReservation(reservation)).then(resolve).catch(reject);
        });
        history.push("/user/trips");
      } catch (res) {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) {
          setErrors(data.errors);
          inputField.classList.add("date-error");
          dateField.classList.add("date-error");
          checkin.classList.add("date-error");
          checkout.classList.add("date-error");
        } else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    } else {
      setErrors(["Minimum of 1 night required!"]);
      inputField.classList.add("date-error");
      dateField.classList.add("date-error");
      checkin.classList.add("date-error");
      checkout.classList.add("date-error");
    }
  };

  useEffect(() => {
    const calculatedNumNights = differenceInDays(endDate, startDate);
    const calculatedServiceFee = parseFloat(
      nightPrice * calculatedNumNights * 0.17
    ).toFixed(2);
    const calculatedTotal = (
      nightPrice * calculatedNumNights +
      cleaningFee +
      parseFloat(calculatedServiceFee)
    ).toFixed(2);

    setNumNights(calculatedNumNights);
    setServiceFee(calculatedServiceFee);
    setTotal(calculatedTotal);
  }, [startDate, endDate]);

  return (
    <>
      <div className="booking-header">
        <div className="booking-price">
          <h2>${listing.nightPrice}</h2>
          <span>night</span>
        </div>
        <div className="booking-reviews">
          <div className="listing-rating">
            <div className="review-star">
              <Star />
            </div>
            <div className="listing-rating-score">
              {listing.ratings.overallRating}
            </div>
          </div>
          <span className="separator">&#x2022;</span>
          <div className="listing-num-reviews">
            <span>{listing.numReviews} reviews</span>
          </div>
        </div>
      </div>
      {!currentUser && (
        <div className="require-login">
          <div>Please Login to make a reservation</div>
          <button
            id="login-btn"
            onClick={() => setToggleModal(true)}
            style={{
              backgroundPosition: `calc((100 - ${mousePositions.login.x}) * 1%) calc((100 - ${mousePositions.login.y}) * 1%)`,
            }}
            onMouseMove={(e) => handleMouseMove(e, "login")}
          >
            Login/Signup
          </button>
        </div>
      )}
      {currentUser && (
        <div className="booking-form">
          <div className="input-fields">
            <div className="date-fields">
              <div
                className="check-in-field"
                onClick={() => setCalendarOpen((prevState) => !prevState)}
              >
                <div className="check-in-tag">CHECK-IN</div>
                <input
                  className="check-in-input"
                  placeholder="MM/DD/YYYY"
                  readOnly
                  value={format(startDate, "MM/dd/yyyy")}
                />
              </div>
              <div
                className="check-out-field"
                onClick={() => setCalendarOpen((prevState) => !prevState)}
              >
                <div className="check-out-tag">CHECKOUT</div>
                <input
                  className="check-out-input"
                  placeholder="MM/DD/YYYY"
                  readOnly
                  value={format(endDate, "MM/dd/yyyy")}
                />
              </div>
              {calendarOpen && (
                <ReservationCalendar
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  calenderOpen={calendarOpen}
                  setCalendarOpen={setCalendarOpen}
                  blockedDates={blockedDates}
                />
              )}
            </div>
            <div>
              <div className="num-guests-field">
                <div className="num-guests-tag">GUESTS</div>
                <input
                  className="num-guests-input"
                  type="number"
                  min="1"
                  value={numGuests}
                  onChange={(e) => setNumGuests(e.target.value)}
                />
              </div>
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

          <div className="price-field">
            <div className="price-calc-line">
              <div>
                ${nightPrice} x {numNights} nights
              </div>
              <div>${nightPrice * numNights}</div>
            </div>
            <div className="price-calc-line">
              <div>Cleaning fee</div>
              <div>${cleaningFee}</div>
            </div>
            <div className="price-calc-line">
              <div>NextBnB service fee</div>
              <div>${serviceFee}</div>
            </div>
            <div className="divisor">
              <hr />
            </div>
            <div className="price-calc-line">
              <div className="total-price">Total before taxes</div>
              <div className="total-price">${total}</div>
            </div>
          </div>
          <button
            id="reserve-btn"
            onClick={handleReserve}
            style={{
              backgroundPosition: `calc((100 - ${mousePositions.reserve.x}) * 1%) calc((100 - ${mousePositions.reserve.y}) * 1%)`,
            }}
            onMouseMove={(e) => handleMouseMove(e, "reserve")}
          >
            Reserve
          </button>
        </div>
      )}
    </>
  );
};

export default Reservation;
