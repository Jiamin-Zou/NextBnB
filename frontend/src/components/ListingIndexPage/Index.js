import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import ListingList from "./ListingList";
import LoadingPage from "../../util/LoadingPage";
import "./ListingIndex.css"
import ListingCategoryPicker from "./LisingCategoryPicker";

const ListingIndexPage = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => Object.values(state.listings));

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  if (!listings) return <LoadingPage />;

  return (
    <div className="listing-index">
      <ListingCategoryPicker />
      <ListingList listings={listings} />
    </div>
  );
};

export default ListingIndexPage;
