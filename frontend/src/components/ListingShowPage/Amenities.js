import "./Amenities.css";
import Ac from '../../assets/images/amenity_icons/ac.svg'
import Fireplace from '../../assets/images/amenity_icons/fireplace.svg'
import Heat from '../../assets/images/amenity_icons/heat.svg'
import Kitchen from '../../assets/images/amenity_icons/kitchen.svg'
import Parking from '../../assets/images/amenity_icons/parking.svg'
import PetsAllowed from '../../assets/images/amenity_icons/pets_allowed.svg'
import Tv from '../../assets/images/amenity_icons/tv.svg'
import Wifi from '../../assets/images/amenity_icons/wifi.svg'

const Amenities = ({ listing }) => {
  return (
    <div className="amenities-container">
      <div className="amenities-list">
        {listing.hasWifi && (
          <div className="amenity-item-show">
            <div className='amenity-item'>

            <img src={Wifi} alt="" />
            <span>Wifi</span>
            </div>
          </div>
        )}

        {listing.hasPets && (
          <div className="amenity-item-show">
            <div className='amenity-item'>

            <img src={PetsAllowed} alt="" />
            <span>Pets allowed</span>
            </div>
          </div>
        )}

        {listing.hasKitchen && (
          <div className="amenity-item-show">
            <div className='amenity-item'>

            <img src={Kitchen} alt="" />
            <span>Kitchen</span>
            </div>
          </div>
        )}

        {listing.hasAc && (
          <div className="amenity-item-show">
            <div className='amenity-item'>

            <img src={Ac} alt="" />
            <span>Air Conditioning</span>
            </div>
          </div>
        )}

        {listing.hasHeat && (
          <div className="amenity-item-show">
            <div className='amenity-item'>

            <img src={Heat} alt="" />
            <span>Heating</span>
            </div>
          </div>
        )}

        {listing.hasTv && (
          <div className="amenity-item-show">
            <div className='amenity-item'>

            <img src={Tv} alt="" />
            <span>TV</span>
            </div>
          </div>
        )}

        {listing.hasParking && (
          <div className="amenity-item-show">
            <div className='amenity-item'>

            <img src={Parking} alt="" />
            <span>Parking</span>
            </div>
          </div>
        )}

        {listing.hasFireplace && (
          <div className="amenity-item-show">
            <div className='amenity-item'>

            <img src={Fireplace} alt="" />
            <span>Fire place</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Amenities;
