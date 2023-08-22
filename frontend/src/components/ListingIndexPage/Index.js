import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, filterListings } from "../../store/listings";
import ListingList from "./ListingList";
import LoadingPage from "../../util/LoadingPage";
import "./ListingIndex.css";
import ListingCategoryPicker from "./LisingCategoryPicker";
import { useHistory, useParams } from "react-router-dom";
import { ReactComponent as ListIcon } from "../../assets/images/list_icon.svg";
import { ReactComponent as MapIcon } from "../../assets/images/map_icon.svg";
import Map from "../Map";

const ListingIndexPage = () => {
  const { category } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const listings = useSelector((state) => Object.values(state.listings));
  const categoryListing = useSelector(filterListings(category));
  const [loading, setLoading] = useState(true);
  const [toggleMap, setToggleMap] = useState(false);

  useEffect(() => {
    document.title = "NextBnB | Home";
  }, []);

  const handleCategorySelect = (e) => {

    const categoryFilter = e.currentTarget.id;
    if (categoryFilter === "all") {
      return history.push("/");
    }
    history.push(`/category/${categoryFilter}`);
  };
  useEffect(() => {
    dispatch(fetchListings()).then(() => setLoading(false));
  }, [dispatch, category]);

  if (loading) return <LoadingPage />;

  return (
    <div className="listing-index">
      <ListingCategoryPicker handleSelect={handleCategorySelect} />
      {toggleMap ? (
        <div className="index-map-wrapper">
          <Map listings={category ? categoryListing : listings} />
        </div>
      ) : (
        <ListingList listings={category ? categoryListing : listings} />
      )}

      <button
        className="map-toggle"
        onClick={() => setToggleMap((prev) => !prev)}
      >
        <div>{toggleMap ? "Show list" : "Show map"}</div>
        <div className="toggle-map-svg">
          {toggleMap ? <ListIcon /> : <MapIcon />}
        </div>
      </button>
    </div>
  );
};

export default ListingIndexPage;
