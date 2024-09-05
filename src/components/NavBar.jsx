import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";

function NavBar () {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


    return (
        <>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/businesses">Businesses</NavLink>
                <NavLink to="/businesses/create">Add Business</NavLink>
                <NavLink to="/about">About</NavLink>
                
                {!isLoggedIn && (
                    <>
                        <NavLink to="/signup">SignUp</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </>
                )}

                {isLoggedIn && (
                    <button onClick={logOutUser}>Log out</button>
                )}
            </nav>
        </>
    )
}

export default NavBar;