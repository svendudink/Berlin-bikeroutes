import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { UserInfoContext } from "../ContextProvider/UserInfoContext";

import Maps from "../google maps/maps";

const BikeRoutes = () => {
  const { user } = useContext(UserInfoContext);

  console.log(user);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [name, setName] = useState();
  const [dificulty, setDificulty] = useState();

  const LatitudeHandler = (e) => {
    setLatitude(e.target.value);
  };

  const longitudeHandler = (event) => {
    setLongitude(event.target.value);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const dificultyHandler = (e) => {
    setDificulty(e.target.value);
  };

  const clickHandler = () => {
    console.log(dificulty, name, longitude, latitude);
    fetch("http://localhost:8080/routes/routes/", {
      method: "POST",

      body: JSON.stringify({
        dificulty: dificulty,
        name: name,
        latitude: latitude,
        longitude: longitude,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resData) => console.log(resData))
      .catch((err) => console.log(err));
  };

  const render = (event) => {
    console.log(event);
  };

  return (
    <div>
      <button onClick={clickHandler}>send</button>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required"
            onChange={nameHandler}
            defaultValue="route Name"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required"
            onChange={LatitudeHandler}
            defaultValue="Latitude"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required"
            onChange={longitudeHandler}
            defaultValue="longitude"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required"
            onChange={dificultyHandler}
            defaultValue="dificulty"
          />
        </div>
      </Box>
      <Wrapper
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        render={render}
      >
        <Maps />
      </Wrapper>
    </div>
  );
};

export default BikeRoutes;
