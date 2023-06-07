import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

const ListingMap = () => {
  const [map, setMap] = useState(null);
  const mapRef = useRef();
  const markersRef = useRef({});
  
  useEffect(() => {
    if (!map) {
      const defaultOptions = {
        zoom: 10,
        center: { lat: 40.770125, lng: -73.993275 },
      };
      const mapOptions = { ...defaultOptions, ...props.mapOptions };
      const googleMap = new google.maps.Map(mapRef, mapOptions);
      setMap(googleMap);
    }
  }, [map]);

  return <div ref={mapRef}>Map</div>;
};

const ListingMapWrapper = (props) => {
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <ListingMap {...props} />
    </Wrapper>
  );
};

export default ListingMapWrapper;
