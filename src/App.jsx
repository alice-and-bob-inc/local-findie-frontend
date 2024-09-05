import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import HomePage from "./pages/HomePage";
import BusinessList from "./pages/BusinessList";
import CreateBusiness from "./pages/CreateBusiness";
import EditBusines from "./pages/EditBusiness";
import BusinessDetails from "./pages/BusinessDetails";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import Footer from "./components/Footer";

import './App.css'
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';


function App() {

  return (
    <>
      <NavBar/>

      <Routes>
        <Route 
          path="/" 
          element={<HomePage/>}

        />

        <Route 
          path="/businesses" 
          element={<BusinessList/>}
        />

        <Route 
          path="/businesses/create" 
          element={ <IsPrivate> <CreateBusiness/> </IsPrivate> }
        />

        <Route 
          path="/businesses/:businessId" 
          element={<BusinessDetails/>}
        />

        <Route 
          path="/businesses/edit/:businessId" 
          element={ <IsPrivate> <EditBusines/> </IsPrivate> }
        />

        <Route 
          path="/signup"  
          element={ <IsAnon> <SignupPage/> </IsAnon> } 
        />

        <Route 
          path="/login" 
          element={ <IsAnon> <LoginPage/> </IsAnon> } 
        />

        <Route 
          path="/about" 
          element={<AboutPage/>}
        />

        <Route 
          path="*" 
          element={<NotFoundPage/>}
        />

      </Routes>

      <Footer/>
    </>
  )
}

export default App
