import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import BikeRoutes from "./components/bikeroutes/Bikeroutes";
import routes from "./components/bikeroutes/Bikeroutes";
import MainPage from "./components/mainPage/MainPage";
import SignUp from "./components/SignUpPage/SignUpPage";
import Login from "./components/SignUpPage/LoginPage";
import { UserInfoContextProvider } from "./components/ContextProvider/UserInfoContext";
import { NavBarContextProvider } from "./components/ContextProvider/NavBarContext";

function App() {
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
          </Routes>
        </BrowserRouter>
      </UserInfoContextProvider>
    </NavBarContextProvider>
  );
}

export default App;
