import All from "../../assets/images/category_icons/all.jpg";
import AmazingViews from "../../assets/images/category_icons/amazing_views.jpg";
import Barn from "../../assets/images/category_icons/barn.jpg";
import Beachfront from "../../assets/images/category_icons/beachfront.jpg";
import Cabin from "../../assets/images/category_icons/cabin.jpg";
import Countryside from "../../assets/images/category_icons/countryside.jpg";
import Lakefront from "../../assets/images/category_icons/lakefront.jpg";
import Mansion from "../../assets/images/category_icons/mansion.jpg";
import Modern from "../../assets/images/category_icons/modern.jpg";
import Omg from "../../assets/images/category_icons/omg.jpg";
import TinyHome from "../../assets/images/category_icons/tiny_home.jpg";
import Filter from "../../assets/images/category_icons/filter.svg";
import "./ListingCategoryPicker.css";

const ListingCategoryPicker = ({ handleSelect }) => {
  return (
    <div className="category-picker-container">
      <div className="listing-index-filters">
        <div className="filter-bar">
          <div className="category-picker">
            <div className="categories">
              <div
                className="category-item active"
                id="all"
                onClick={handleSelect}
              >
                <img
                  className="category-img"
                  src={All}
                  alt="cg-All"
                  onLoad={(e) => handleSelect(e, "all")}
                />
                <span className="category-name">All</span>
              </div>
              <div
                className="category-item"
                id="beachfront"
                onClick={handleSelect}
              >
                <img
                  className="category-img"
                  src={Beachfront}
                  alt="cg-Beachfront"
                />
                <span className="category-name">Beachfront</span>
              </div>
              <div className="category-item" id="omg" onClick={handleSelect}>
                <img className="category-img" src={Omg} alt="cg-Omg" />
                <span className="category-name">OMG!</span>
              </div>
              <div
                className="category-item"
                id="amazing views"
                onClick={handleSelect}
              >
                <img
                  className="category-img"
                  src={AmazingViews}
                  alt="cg-AmazingViews"
                />
                <span className="category-name">Amazing Views</span>
              </div>
              <div className="category-item" id="modern" onClick={handleSelect}>
                <img className="category-img" src={Modern} alt="cg-Modern" />
                <span className="category-name">Modern</span>
              </div>
              <div className="category-item" id="cabin" onClick={handleSelect}>
                <img className="category-img" src={Cabin} alt="cg-Cabin" />
                <span className="category-name">Cabin</span>
              </div>
              <div
                className="category-item"
                id="lakefront"
                onClick={handleSelect}
              >
                <img
                  className="category-img"
                  src={Lakefront}
                  alt="cg-Lakefront"
                />
                <span className="category-name">Lakefront</span>
              </div>
              <div
                className="category-item"
                id="tiny home"
                onClick={handleSelect}
              >
                <img
                  className="category-img"
                  src={TinyHome}
                  alt="cg-TinyHome"
                />
                <span className="category-name">Tiny Home</span>
              </div>
              <div
                className="category-item"
                id="countryside"
                onClick={handleSelect}
              >
                <img
                  className="category-img"
                  src={Countryside}
                  alt="cg-Countryside"
                />
                <span className="category-name">Countryside</span>
              </div>
              <div
                className="category-item"
                id="mansion"
                onClick={handleSelect}
              >
                <img className="category-img" src={Mansion} alt="cg-Mansion" />
                <span className="category-name">Mansion</span>
              </div>
              <div className="category-item" id="barn" onClick={handleSelect}>
                <img className="category-img" src={Barn} alt="cg-Barn" />
                <span className="category-name">Barn</span>
              </div>
            </div>
          </div>
          <div>
            <button className="filter-btn">
              <div className="filter-btn-container">
                <img
                  className="filter-btn-img"
                  src={Filter}
                  alt="filter svg"
                  width="14"
                  height="14"
                />
                <span className="filter-btn-name">Filters</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategoryPicker;
