import { useHistory } from "react-router-dom";

const ListingListItem = ({ listing }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/listings/${listing.id}`);
  };

  return (
    <div className="listing-list-item">
        <h3>{listing.city}, {listing.state}</h3>
        <div>
            <span>${listing.nightPrice}</span> night
        </div>
    </div>
  )
};

export default ListingListItem;
