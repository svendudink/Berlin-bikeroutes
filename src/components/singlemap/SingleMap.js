import { Wrapper } from "@googlemaps/react-wrapper";
import Maps from "../google maps/maps";
import "./SingleMap.css";

const SingleMap = () => {
  const render = (event) => {
    //console.log(event);
  };

  const userName = "Placeholder";

  return (
    <div className="singleItem">
      <h1 className="letterSize">Route provided by {userName}</h1>
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        render={render}
      >
        <Maps />
      </Wrapper>
    </div>
  );
};

export default SingleMap;
