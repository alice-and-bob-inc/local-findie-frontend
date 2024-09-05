import React, { useState, useEffect } from "react";
import authService from "../services/auth.services";

// const API_URL = import.meta.env.API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
    const storeToken = (token) => {
        localStorage.setItem("authToken", token)
    }


    const authenticateUser = () => {
        // Get the stored token from the localStorage
        const storedToken = localStorage.getItem("authToken");

        // If the token exists in the localStorage
        if(storedToken){
            authService.verify()
            .then((response) => {
                // If the server verifies that the JWT token is indeed valid
                const user = response.data;
                // Update state variables
                setIsLoggedIn(true);
                setIsLoading(false);
                setUser(user);
            })
            .catch((error) => {
                // If the server sends an error response (invalid token)
                // Update state variables
                setIsLoading(false);
                setIsLoggedIn(false);
                setUser(null);
            });
        } else {
            // If the token is not available (or is removed)
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const logOutUser = () => {
        // To log out the user, remove the token
        removeToken();
        // and update the state variables
        authenticateUser();
    }


    useEffect(() => {
        authenticateUser();
    }, [])

  return (
    <AuthContext.Provider 
        value={{ 
            isLoggedIn, 
            isLoading, 
            user,
            storeToken,
            authenticateUser
        }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };
