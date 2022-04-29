import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { UserInfoContext } from "../ContextProvider/UserInfoContext.js";

import "./SignUpPage.css";

function SignUp() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginUserName, setLoginUserName] = useState();

  //Context provider
  const { FetchingLogin } = useContext(UserInfoContext);
  //const setLoginPasswordContext = useContext(UserInfoContext);

  const loginPasswordHandler = (e) => {
    setLoginPassword(e.target.value);
  };

  const loginUserNameHandler = (e) => {
    setLoginUserName(e.target.value);
  };

  const submitHandler = (val) => {
    FetchingLogin(loginUserName, loginPassword);
    //setLoginNameContext(loginUserName);
    // setLoginPasswordContext(loginPassword);
    // setLoginNameContext("it doesnt need to be a function");

    // function login from context
  };

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
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
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

export default SignUp;
