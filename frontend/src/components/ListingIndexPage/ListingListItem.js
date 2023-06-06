import { useHistory } from "react-router-dom";
import sampleHouse from '../../assets/images/sample_house.jpg'
import "./ListingListItem.css"
import ImageLoader from "../../util/ImageLoader";

const ListingListItem = ({ listing }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`/listings/${listing.id}`);
  };

  const listImgs = listing.photoUrls.map((pic, idx) => (
    <ImageLoader key={`${listing.id}_${idx}`} src={pic} className={"listing-item-pic"} alt={`listing${listing.id}_${idx + 1}`} />
  ) )

  const images = listing.photoUrls ? listImgs : <img src={sampleHouse} className="listing-item-pic" alt="listing-item-pic" />
  return (
    <div className="listing-list-item" onClick={handleClick}>
      <div className="image-container">
        {/* <img src={sampleHouse} className="listing-item-pic" alt="listing-item-pic" /> */}
        {images}
        </div>
        <div className="listing-item-city">{listing.city}, {listing.state}</div>
        <div className="listing-item-price">
            <span>${listing.nightPrice}</span> night
        </div>
    </div>
  )
};

export default ListingListItem;
