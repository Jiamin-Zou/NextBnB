import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchListing } from "../../store/listings";
import "./ListingShow.css";
import LoadingPage from "../../util/LoadingPage";
import PageNotFound from "../../util/PageNotFound";
import sampleHouse from "../../assets/images/sample_house.jpg";
import Reservation from "../ReservationForm";

const ListingShowPage = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector((state) => state.listings[listingId]);
  const [errors, setErrors] = useState([]);

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
    return <PageNotFound errors={errors} />;
  } else if (!listing) {
    return <LoadingPage />;
  }

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
        <div className="show-images">
          <img className="listing-img" src={sampleHouse} alt="" />
        </div>
        <div className="show-container">
          <div className="listing-info">
            <div className="listing-headers">
              <h2>
                {listing.propertyType} hosted by {listing.hostId}
              </h2>
              <div className="listing-details">
                <span>{listing.numBedrooms} bedrooms</span>
                <span className="separator">&#x2022;</span>
                <span>{listing.numBeds} beds</span>
                <span className="separator">&#x2022;</span>
                <span>{listing.numBathrooms} baths</span>
              </div>
            </div>
            <div className="listing-description">{listing.description}</div>
          </div>
          <div className="reserve-form">
            <Reservation />
          </div>
        </div>
        <div className="reviews-section">Reviews Component</div>
        <div className="map-section">Map component</div>
      </main>
    </div>
  );
};

export default ListingShowPage;
