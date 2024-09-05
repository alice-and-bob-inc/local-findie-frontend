import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
    const { isLoggedIn, isLoading } = useContext(AuthContext);

    // Return Loading paragraph when the axios request is loading
    if(isLoading){
        return <p>Loading...</p>
    }


    // If the user is not logged in redirect to login page
    if(!isLoggedIn){
        return <Navigate to="/login"/>
    } else{
        // If the user is logged in, render the children of the IsPrivate component
        return children;
    }
}

export default IsPrivate;