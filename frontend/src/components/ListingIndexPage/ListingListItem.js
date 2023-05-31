import { useHistory } from "react-router-dom";
import sampleHouse from '../../assets/images/sample_house.jpg'
import "./ListingListItem.css"

const ListingListItem = ({ listing }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/listings/${listing.id}`);
  };

  return (
    <div className="listing-list-item" onClick={handleClick}>
      <div><img src={sampleHouse} className="listing-item-pic" alt="listing-item-pic" /></div>
        <div className="listing-item-city">{listing.city}, {listing.state}</div>
        <div className="listing-item-price">
            <span>${listing.nightPrice}</span> night
        </div>
    </div>
  )
};

export default ListingListItem;
