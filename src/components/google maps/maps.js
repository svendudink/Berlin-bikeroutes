import {
  GoogleMap,
  useLoadScript,
  Marker,
  KmlLayer,
} from "@react-google-maps/api";
import "./maps.css";
import sharedRoute from "./sharedroute.kml";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  if (!isLoaded) return <div>not Loaded</div>;
  return <Map />;
}

function Map() {
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -80 }}
      mapContainerClassName="map-container"
    >
      <KmlLayer
        url="http://localhost:8080/tmp/my-uploads/sharedroute.kml'"
        options={{ preserveViewport: false }}
      />
    </GoogleMap>
  );
}
