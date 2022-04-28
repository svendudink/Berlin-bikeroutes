
import { Route, BrowserRouter, Routes } from "react-router-dom";
import './App.css';
import NavBar from './components/Navbar/NavBar';
import BikeRoutes from "./components/bikeroutes/Bikeroutes";
import routes from './components/bikeroutes/Bikeroutes'
import MainPage from "./components/mainPage/MainPage";
import SignUp from "./components/SignUpPage/SignUpPage";



function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
      <Route path="/" element={<MainPage />} component={routes}/>
      <Route path="/routes" element={<BikeRoutes />} component={routes}/>
      <Route path="/signup" element={<SignUp />} component={routes}/>
    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
