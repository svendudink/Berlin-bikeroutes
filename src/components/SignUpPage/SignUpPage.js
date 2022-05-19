import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./SignUpPage.css";

function SignUp() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState();

  //

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "Username already in use",
    pass: "Passwords do not match",
  };

  const handleSubmit = async (event) => {
    if (password !== confirmpassword) {
      event.preventDefault();
      displayMessage("password does not match");
      return;
    } else {
      event.preventDefault();
      displayMessage("");
    }
    console.log("tvg");

    const imageMerged = new FormData();
    imageMerged.append("image", selectedFile);

    //Prevent page reload
    event.preventDefault();

    //send to server
    console.log(userName, password, email, imageMerged);
    await fetch("http://localhost:8080/signup", {
      method: "POST",

      body: JSON.stringify({
        user: userName,
        password: password,
        email: email,
        image: imageMerged,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resData) => displayMessage(resData))
      .catch((err) => console.log(err));
    // end of send to server

    console.log("check the input");

    let { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "passconfirm", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    }
    // else {
    //   console.log("username is checked for existence");
    //   // Username not found
    //   setErrorMessages({ name: "uname", message: errors.uname });
    // }
  };

  const displayMessage = (resData) => {
    console.log(resData);
    console.log(resData.message);
    setErrorMessages({});
    if (resData.msg === "user allready existing")
      setErrorMessages({ name: "uname", message: errors.uname });
    if (resData === "password does not match")
      setErrorMessages({ name: "passconfirm", message: errors.pass });
    if (resData.message === "Post created successfully!") {
      alert("New user is created, congratulations");
    }
  };

  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const userNameHandler = (event) => {
    setuserName(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" onChange={userNameHandler} required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            onChange={passwordHandler}
            required
          />
          {renderErrorMessage("pass")}
        </div>
        <div className="input-container">
          <label>Confirm Password </label>
          <input
            type="password"
            name="pass"
            onChange={confirmPasswordHandler}
            required
          />
          {renderErrorMessage("passconfirm")}
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="pass" onChange={emailHandler} required />
          {renderErrorMessage("pass")}
        </div>
        <div className="mb-1">
          Picture of your bike <span className="font-css top">*</span>
          <div className="">
            <input
              type="file"
              id="file-input"
              name="ImageStyle"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign up</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default SignUp;
