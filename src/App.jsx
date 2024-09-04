import HomePage from "./pages/HomePage";
import BusinessList from "./pages/BusinessList";
import BusinessDetails from "./pages/BusinessDetails";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

import { NavLink, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/businesses">Businesses</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/businesses" element={<BusinessList/>}/>
        <Route path="/businesses/:businessId" element={<BusinessDetails/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>

      </Routes>
    </>
  )
}

export default App
