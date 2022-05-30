import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  useLoadScript,
  Marker,
  KmlLayer,
} from "@react-google-maps/api";
import "./maps.css";
import sharedRoute from "./sharedroute.kml";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = {
  lat: 41.876,
  lng: -87.624,
};

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
      id="kml-layer-example"
      mapContainerStyle={mapContainerStyle}
      zoom={11}
      center={center}
    >
      <KmlLayer
        url="https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml"
        options={{ preserveViewport: false }}
      />
    </GoogleMap>
  );
}
