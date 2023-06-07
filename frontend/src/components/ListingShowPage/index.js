import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../store/listings";
import "./ListingShow.css";
import LoadingPage from "../../util/LoadingPage";
import PageNotFound from "../../util/PageNotFound";
import sampleHouse from "../../assets/images/sample_house.jpg";
import Reservation from "../ReservationForm";
import Amenities from "./Amenities";
import addDays from "date-fns/addDays";
import ReservationCalendar from "../ReservationCalendar";
import ImageLoader from "../../util/ImageLoader";
import { convertToDate } from "../../util/util";
import { getReservedDates } from "../../store/reservations";

const ListingShowPage = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const [errors, setErrors] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 3));
  const [calendarOpen, setCalendarOpen] = useState(false);

  const hostSelector = (state) => {
    if (listing) {
      const id = listing.hostId;
      const listingHost = state.hosts[id];
      return listingHost;
    }
  };

  // const getReservedDates = (state) => {
  //   if(listing) {
  //     const listingReservations = Object.values(state.reservations).filter((res) => res.listingId === listing.id)
  //     const reservedDates = []
  //     listingReservations.forEach((res) =>{
  //       const start = convertToDate(res.startDate)
  //       const end = convertToDate(res.endDate)
    
  //       const currentDate = new Date(start)
  //       while (currentDate <= end) {
  //         reservedDates.push(new Date(currentDate));
  //         currentDate.setDate(currentDate.getDate() + 1);
  //       }
  //     })
    
  //     return reservedDates
  //   }
  // }

  const host = useSelector(hostSelector);
  const blockDates = useSelector(getReservedDates(listing?.id))

  useEffect(() => {
    dispatch(fetchListing(listingId)).catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  }, [listingId, dispatch]);

  if (!listing && errors.length > 0) {
    return <PageNotFound />;
  } else if (!listing || !host || !blockDates) {
    return <LoadingPage />;
  }

  console.log(blockDates)
  const imageGroup = listing.photoUrls ? (
    <div className="listing-img-group-container">
      <div className="img-group-left">
        <div className="img-wrapper">
          <ImageLoader src={listing.photoUrls[0]} alt={`listing${listing.id}_1`} />
        </div>
      </div>
      <div className="img-group-right">
        <div className="img-wrapper">
          <ImageLoader src={listing.photoUrls[1]} alt={`listing${listing.id}_2`} />
        </div>

        <div className="img-wrapper">
          <ImageLoader src={listing.photoUrls[2]} alt={`listing${listing.id}_3`} />
        </div>
        <div className="img-wrapper">
          <ImageLoader src={listing.photoUrls[3]} alt={`listing${listing.id}_4`} />
        </div>
        <div className="img-wrapper">
          <ImageLoader src={listing.photoUrls[4]} alt={`listing${listing.id}_5`} />
        </div>
      </div>
    </div>
  ) : (
    <div className="listing-img-group-container">
      <img
        className="listing-img-group-container"
        src={sampleHouse}
        alt="sample"
      />
    </div>
  );

  return (
    <div className="listing-show">
      <main className="show-main-container">
        <div className="show-header">
          <h1 className="listing-title">{listing.title}</h1>
          <div>
            <span className="listing-location">
              {listing.city}, {listing.state}, {listing.country}
            </span>
          </div>
        </div>
        <div className="show-images">{imageGroup}</div>
        <div className="show-container">
          <div className="listing-info">
            <div className="listing-headers">
              <h2>
                {listing.propertyType} hosted by {host.firstName}
              </h2>
              <div className="listing-details">
                <span>{listing.numBedrooms} bedrooms</span>
                <span className="separator">&#x2022;</span>
                <span>{listing.numBeds} beds</span>
                <span className="separator">&#x2022;</span>
                <span>{listing.numBathrooms} baths</span>
              </div>
            </div>
            <div className="listing-description">
              <h2>About this place</h2>
              <div>{listing.description}</div>
            </div>
            <div className="amenities">
              <h2>What this place offers</h2>
              <div className="amenities-comp">
                <Amenities listing={listing} />
              </div>
            </div>
            <div className="booking-calender">
              <ReservationCalendar
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                calenderOpen={calendarOpen}
                setCalendarOpen={setCalendarOpen}
              />
            </div>
          </div>
          <div className="reserve-form-container">
            <div className="reserve-form">
              <Reservation
                listing={listing}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                calendarOpen={calendarOpen}
                setCalendarOpen={setCalendarOpen}
              />
            </div>
          </div>
        </div>

        <div className="reviews-section">Reviews Component</div>
        <div className="map-section">Map component</div>
      </main>
    </div>
  );
};

export default ListingShowPage;
