import { useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  OverlayView,
  Circle,
} from "@react-google-maps/api";
import LoadingPage from "../../util/LoadingPage";
import "./Map.css";
import mapStyles from "./MapStyles";
import ListingMarker from "./ListingMarker";
import { ReactComponent as HomeIcon } from "../../assets/images/home_icon.svg";

const MapContainer = ({ listings, center }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });
  const [activeMarker, setActiveMarker] = useState(null);

  const defaultCenter = center ? center : { lat: 40.770124, lng: -73.993277 };
  const isActiveMarker = useMemo(() => activeMarker, [activeMarker]);
  const mapCenter = useMemo(() => defaultCenter, []);

  if (!isLoaded) return <LoadingPage />;

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    streetViewControl: true,
    streetViewControlOptions: {
      position: window.google.maps.ControlPosition.TOP_RIGHT,
    },
    zoomControl: true,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_TOP,
    },
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
    },
    minZoom: 2,
    maxZoom: 16,
  };

  const handleMarkerClick = (listingId) => {
    if (activeMarker !== listingId) {
      setActiveMarker(listingId);
    } else {
      setActiveMarker(null);
    }
  };

  const circleOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.1,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  };

  return (
    <GoogleMap
      zoom={center ? 14 : 10}
      center={mapCenter}
      mapContainerClassName="map-container"
      options={options}
    >
      {center && (
        <>
          <Circle center={center} radius={450} options={circleOptions} />
          <OverlayView
            position={center}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="overlay-home-icon"><HomeIcon /></div>
          </OverlayView>
        </>
      )}
      {!center &&
        listings.map((listing) => {
          return (
            <OverlayView
              key={listing.id}
              position={{ lat: listing.latitude, lng: listing.longitude }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <ListingMarker
                listing={listing}
                isActive={isActiveMarker === listing.id}
                onClick={handleMarkerClick}
              />
            </OverlayView>
          );
        })}
    </GoogleMap>
  );
};
export default MapContainer;
