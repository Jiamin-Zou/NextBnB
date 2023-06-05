import { useModal } from "../../context/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import ReservationCalendar from "../ReservationCalendar";
import { useState, useEffect } from "react";
import "./ReservationForm.css";
import format from "date-fns/format";
import { createReservation } from "../../store/reservations";
import { differenceInDays } from "date-fns";

const Reservation = ({
  listing,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const dispatch = useDispatch();
  const { setToggleModal } = useModal();
  const currentUser = useSelector((state) => state.session.currentUser);
  const [calenderOpen, setCalenderOpen] = useState(false);
  const [numGuests, setNumGuests] = useState(1);
  const [numNights, setNumNights] = useState(1);
  const [serviceFee, setServiceFee] = useState(0);
  const [total, setTotal] = useState(0);
  const nightPrice = listing.nightPrice;
  const cleaningFee = listing.cleaningFee;

  const handleReserve = (e) => {
    const reservation = {
      listingId: listing.id,
      numGuests,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(startDate, "yyyy-MM-dd"),
    };
    dispatch(createReservation(reservation));
  };

  useEffect(() => {
    const calculatedNumNights = differenceInDays(endDate, startDate);
    const calculatedServiceFee = parseFloat(nightPrice * calculatedNumNights * 0.17).toFixed(2);
    const calculatedTotal = ((nightPrice * calculatedNumNights) + cleaningFee + parseFloat(calculatedServiceFee)).toFixed(2);

    setNumNights(calculatedNumNights);
    setServiceFee(calculatedServiceFee);
    setTotal(calculatedTotal);
  }, [startDate, endDate]);

  return (
    <>
      <div>Status: {currentUser ? "Logged in" : "Not Logged in"}</div>
      {!currentUser && (
        <div>
          <div>Please Login to make a reservation</div>
          <button onClick={() => setToggleModal(true)}>Login/Signup</button>
        </div>
      )}
      {currentUser && (
        <div className="booking-form">
          <div className="booking-header">
            <div className="booking-price">
              <h2>${listing.nightPrice}</h2>
              <span>night</span>
            </div>
            <div className="booking-reviews">
              <div>x review-score</div>
              <span className="separator">&#x2022;</span>
              <div>listing.reviews.length</div>
            </div>
          </div>
          <div className="input-fields">
            <div className="date-fields">
              <div
                className="check-in-field"
                onClick={() => setCalenderOpen((prevState) => !prevState)}
              >
                <div className="check-in-tag">CHECK-IN</div>
                <input
                  className="check-in-input"
                  placeHolder="MM/DD/YYYY"
                  readOnly
                  value={format(startDate, "MM/dd/yyyy")}
                />
              </div>
              <div
                className="check-out-field"
                onClick={() => setCalenderOpen((prevState) => !prevState)}
              >
                <div className="check-out-tag">CHECKOUT</div>
                <input
                  className="check-out-input"
                  placeHolder="MM/DD/YYYY"
                  readOnly
                  value={format(endDate, "MM/dd/yyyy")}
                />
              </div>
              {calenderOpen && (
                <ReservationCalendar
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  setCalenderOpen={setCalenderOpen}
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

          <div>
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
              <div>Total before taxes</div>
              <div>${total}</div>
            </div>
          </div>
          <button>Reserve</button>
        </div>
      )}
    </>
  );
};

export default Reservation;
