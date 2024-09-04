import HomePage from "./pages/HomePage";
import BusinessList from "./pages/BusinessList";
import CreateBusiness from "./components/CreateBusiness";
import BusinessDetails from "./pages/BusinessDetails";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";

import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css'
import EditBusines from "./components/EditBusiness";

function App() {

  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/businesses">Businesses</NavLink>
        <NavLink to="/businesses/create">Add Business</NavLink>
        <NavLink to="/signup">SignUp</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/businesses" element={<BusinessList/>}/>
        <Route path="/businesses/create" element={<CreateBusiness/>}/>
        <Route path="/businesses/:businessId" element={<BusinessDetails/>}/>
        <Route path="/businesses/edit/:businessId" element={<EditBusines/>}/>
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>

      <Footer/>
    </>
  )
}

export default App
