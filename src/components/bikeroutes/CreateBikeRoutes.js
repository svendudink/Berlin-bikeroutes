import { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { UserInfoContext } from "../ContextProvider/UserInfoContext";
import SingleMap from "../singlemap/SingleMap";

// import { Wrapper } from "@googlemaps/react-wrapper";
// import Maps from "../google maps/maps";

const CreateBikeRoutes = () => {
  const { user } = useContext(UserInfoContext);

  console.log(user);

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [name, setName] = useState();
  const [dificulty, setDificulty] = useState();
  const [selectedFile, setSelectedFile] = useState();

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

  const clickHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    formData.append("difficulty", dificulty);
    formData.append("name", name);
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    console.log(dificulty, name, longitude, latitude);
    fetch("http://localhost:8080/routes/routes/", {
      method: "POST",

      body: formData,
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
      <div className="mb-1">
        Upload your map file <span className="font-css top">*</span>
        <div className="">
          <input
            type="file"
            id="file-input"
            name="ImageStyle"
            encType="multipart/form-data"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBikeRoutes;
