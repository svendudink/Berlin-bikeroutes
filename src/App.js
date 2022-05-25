import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import BikeRoutes from "./components/bikeroutes/Bikeroutes";
import routes from "./components/bikeroutes/Bikeroutes";
import MainPage from "./components/mainPage/MainPage";
import SignUp from "./components/SignUpPage/SignUpPage";
import Login from "./components/SignUpPage/LoginPage";
import Profile from "./components/Profile/Profile";
import { UserInfoContextProvider } from "./components/ContextProvider/UserInfoContext";
import { UserInfoContext } from "./components/ContextProvider/UserInfoContext";
import { NavBarContextProvider } from "./components/ContextProvider/NavBarContext";
import { getToken } from "./utils/getToken.js";
import { useState } from "react";
import { useEffect, useContext } from "react";

function App() {
  const [user, setUser] = useState(false);

  const checkIfUserIsLoggedIn = () => {
    const token = getToken();
    if (token) {
      console.log("logged in");
      setUser(true);
    } else {
      console.log("not logged");
      setUser(false);
    }
  };
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, [user]);

  return (
    <NavBarContextProvider>
      <UserInfoContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<MainPage />} component={routes} />
            <Route path="/routes" element={<BikeRoutes />} component={routes} />
            <Route path="/signup" element={<SignUp />} component={routes} />
            <Route path="/Login" element={<Login />} component={routes} />
            <Route path="/Profile" element={<Profile />} component={routes} />
          </Routes>
        </BrowserRouter>
      </UserInfoContextProvider>
    </NavBarContextProvider>
  );
}

export default App;
