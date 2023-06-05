import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, filterListings } from "../../store/listings";
import ListingList from "./ListingList";
import LoadingPage from "../../util/LoadingPage";
import "./ListingIndex.css";
import ListingCategoryPicker from "./LisingCategoryPicker";
import { useHistory, useParams } from "react-router-dom";

const ListingIndexPage = () => {
  const { category } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const listings = useSelector((state) => Object.values(state.listings));
  const categoryListing = useSelector(filterListings(category))
  const [loading, setLoading] = useState(true);

  const handleCategorySelect = (e) => {
    const categories = Array.from(
      document.getElementsByClassName("category-item")
    );
    categories.forEach((category) => {
      category.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    const categoryFilter = e.currentTarget.id;
    if(categoryFilter === "all"){
      return history.push("/")
    }
    history.push(`/category/${categoryFilter}`);
  };
  useEffect(() => {
    dispatch(fetchListings()).then(() => setLoading(false));
  }, [dispatch, category]);

  if (loading) return <LoadingPage />;

  return (
    <div className="listing-index">
      <ListingCategoryPicker handleSelect={handleCategorySelect} category={category}/>
      <ListingList listings={category ? categoryListing : listings} />
    </div>
  );
};

export default ListingIndexPage;
