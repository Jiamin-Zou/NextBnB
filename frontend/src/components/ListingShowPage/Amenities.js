import "./Amenities.css";

const Amenities = ({ listing }) => {
  return (
    <div className="amenities-container">
      <div className="amenities-list">
        {listing.hasWifi && (
          <div className="amenity-item-show">
            <img src="" alt="" />
            <span>WiFi</span>
          </div>
        )}

        {listing.hasPets && (
          <div className="amenity-item-show">
            <img src="" alt="" />
            <span>Pets allowed</span>
          </div>
        )}

        {listing.hasKitchen && (
          <div className="amenity-item-show">
            <img src="" alt="" />
            <span>Kitchen</span>
          </div>
        )}

        {listing.hasAc && (
          <div className="amenity-item-show">
            <img src="" alt="" />
            <span>Air Conditioning</span>
          </div>
        )}

        {listing.hasHeat && (
          <div className="amenity-item-show">
            <img src="" alt="" />
            <span>Heat</span>
          </div>
        )}

        {listing.hasTv && (
          <div className="amenity-item-show">
            <img src="" alt="" />
            <span>TV</span>
          </div>
        )}

        {listing.hasParking && (
          <div className="amenity-item-show">
            <img src="" alt="" />
            <span>Parking</span>
          </div>
        )}

        {listing.hasFireplace && (
          <div className="amenity-item-show">
            <img src="" alt="" />
            <span>Fire place</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Amenities;
