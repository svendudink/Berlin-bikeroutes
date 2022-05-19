import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { UserInfoContext } from "../ContextProvider/UserInfoContext.js";

import "./SignUpPage.css";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUserName, setLoginUserName] = useState();

  //Context provider

  //const setLoginPasswordContext = useContext(UserInfoContext);

  const loginPasswordHandler = (e) => {
    setLoginPassword(e.target.value);
  };

  const loginUserNameHandler = (e) => {
    setLoginUserName(e.target.value);
  };

  const submitHandler = (val) => {
    //setLoginNameContext(loginUserName);
    // setLoginPasswordContext(loginPassword);
    // setLoginNameContext("it doesnt need to be a function");
    // function login from context

    fetch("http://localhost:8080/login", {
      method: "POST",

      body: JSON.stringify({
        user: loginUserName,
        password: loginPassword,
      }),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resData) => checkRes(resData))
      .catch((err) => console.log(err));
    // end of send to server

    console.log("check the input");
  };

  const checkRes = (resData) => {
    console.log(resData);
    setErrorMessages({});
    if (resData.msg === "user not found")
      setErrorMessages({ name: "uname", message: errors.uname });
    if (resData.msg === "wrong password")
      setErrorMessages({ name: "pass", message: errors.pass });
    if (resData.token) {
      localStorage.setItem("token", resData.token);
    }
  };

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
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
          <input
            type="text"
            name="uname"
            onChange={loginUserNameHandler}
            required
          />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input
            type="password"
            name="pass"
            onChange={loginPasswordHandler}
            required
          />
          {renderErrorMessage("pass")}
        </div>

        <div className="button-container">
          <input type="submit" onClick={submitHandler} />
        </div>
      </form>
    </div>
  );
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Login</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;
