import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Trips.css";
import { fetchTrips, getTrips } from "../../store/reservations";
import wave from "../../assets/images/wave.svg";
import adventure from "../../assets/images/adventure.jpg";
import TripsList from "./TripList";
import LoadingPage from "../../util/LoadingPage";
import { useModal } from "../../context/ModalContext";
import UpdateReservationModal from "../ReservationForm/UpdateReservationModal";
import ReviewForm from "../ReviewForm/Index";

const TripsIndex = () => {
  const { toggleEditModal, toggleReviewModal } = useModal();
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector((state) => state.session.currentUser);
  const trips = useSelector(getTrips);

  const [mousePositions, setMousePositions] = useState({
    search: { x: 0, y: 0 },
  });
  useEffect(() => {
    // if (!currentUser) {
    //   return history.push("/");
    // }
    if (currentUser) {
      dispatch(fetchTrips());
    }
  }, [dispatch, currentUser, history]);

  if (!currentUser) {
    history.push("/");
    return null;
  }

  const handleMouseMove = (event, element) => {
    const rect = event.target.getBoundingClientRect();
    const mouseX = ((event.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((event.clientY - rect.top) / rect.height) * 100;

    setMousePositions((prevMousePositions) => ({
      ...prevMousePositions,
      [element]: { x: mouseX, y: mouseY },
    }));
  };

  const handleClickSearch = () => {
    history.push("/");
  };

  if (!trips) return <LoadingPage />;

  const pastTrips = trips?.filter(
    (trip) => new Date(trip.reservation.endDate) < new Date()
  );
  const currentTrips = trips?.filter((trip) => {
    const endDate = new Date(trip.reservation.endDate);
    const startDate = new Date(trip.reservation.startDate);
    const today = new Date();
    return startDate <= today && endDate >= today;
  });
  const futureTrips = trips?.filter(
    (trip) => new Date(trip.reservation.startDate) > new Date()
  );

  const bannerCard =
    futureTrips?.length > 0 ? (
      <div className="banner-container">
        <div className="banner-first">
          You have {futureTrips.length} upcoming trips!
        </div>
        <div className="banner-second">
          Continue the excitment and look for more adventures
        </div>
      </div>
    ) : (
      <div className="banner-container">
        <div className="banner-first">No trips booked...yet!</div>
        <div className="banner-second">
          Time to dust off your bags and start planning your next adventure
        </div>
      </div>
    );

  return (
    <div className="trips-index-page">
      <div className="trips-index-container">
        <div className="trips-page-header">
          <h1>Trips</h1>
          <h3>
            You booked a total of <span id="trips-count">{trips.length}</span>{" "}
            trips so far!
          </h3>
        </div>
        <div className="search-trips-box">
          <div className="search-trips left">
            <div className="hello">
              <div className="wave-img">
                <img src={wave} alt="hand wave" width="48" height="48" />
              </div>
              <h2>Hi {currentUser.firstName}, welcome back!</h2>
            </div>
            <div className="banner-card">{bannerCard}</div>
            <button
              className="trip-search-btn"
              onClick={handleClickSearch}
              style={{
                backgroundPosition: `calc((100 - ${mousePositions.search.x}) * 1%) calc((100 - ${mousePositions.search.y}) * 1%)`,
              }}
              onMouseMove={(e) => handleMouseMove(e, "search")}
            >
              Start searching
            </button>
          </div>
          <div className="search-trips right">
            <img src={adventure} alt="adventure" />
          </div>
        </div>
        <div className="divisor">
          <hr />
        </div>
        <TripsList trips={currentTrips} type={"current"} />
        <div className="divisor">
          <hr />
        </div>
        <TripsList trips={futureTrips} type={"future"} />
        <div className="divisor">
          <hr />
        </div>
        <TripsList trips={pastTrips} type={"past"} />
      </div>
      {toggleReviewModal && <ReviewForm />}
      {toggleEditModal && <UpdateReservationModal />}
    </div>
  );
};

export default TripsIndex;
