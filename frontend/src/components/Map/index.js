import { useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import LoadingPage from "../../util/LoadingPage";
import "./Map.css";
import mapStyles from "./MapStyles";

const MapContainer = ({ listings, center }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const defaultCenter = center ? center : { lat: 40.770124, lng: -73.993277 };
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
  };

  const overLays = {};


  return (
    <GoogleMap
      zoom={11}
      center={mapCenter}
      mapContainerClassName="map-container"
      options={options}
    >
      {!center && <Marker position={defaultCenter} />}
    </GoogleMap>
  );
};
export default MapContainer;

// center ? <Marker position={center} /> : overLays

// listings.map((listing) => <Marker key={listing.id} position={{lat: listing.latitude, lng:listing.longitude}}/>)
