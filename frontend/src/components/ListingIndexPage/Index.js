import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../../store/listings";
import ListingList from "./ListingList";
import LoadingPage from "../../util/LoadingPage";
import "./ListingIndex.css";
import ListingCategoryPicker from "./LisingCategoryPicker";

const ListingIndexPage = () => {
  const dispatch = useDispatch();
  const listings = useSelector((state) => Object.values(state.listings));
  const [filteredListings, setFilteredListings] = useState(listings)
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchListings()).then(()=> setLoading(false))
  }, [dispatch]);

  const handleSelect = (e, param) => {
    // const categories = document.getElementsByClassName("category-item")
    const categories = Array.from(document.getElementsByClassName("category-item"));
    categories.forEach((category)=> {
      category.classList.remove("active")
    })
    e.currentTarget.classList.add("active")
    
    if (param) {categories[0].classList.add("active")}

    param ||= e.currentTarget.id;

    if (param === "all") {
      setFilteredListings(listings)
    } else {
      const filtered = listings.filter(
        (listing) => listing.category === param.toLowerCase()
      );

      setFilteredListings(filtered)
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="listing-index">
      <ListingCategoryPicker handleSelect={handleSelect} />
      <ListingList listings={filteredListings} />
    </div>
  );
};

export default ListingIndexPage;
