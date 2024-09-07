import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";

function NavBar () {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);


    return (
        <>
            <nav className="bg-green-300 px-5 flex justify-end fixed top-0 min-w-full z-10">
                <NavLink className="px-4 py-4 hover:bg-green-400" to="/">Home</NavLink>
                <NavLink className="px-4 py-4 hover:bg-green-400" to="/businesses">Businesses</NavLink>
                
                {isLoggedIn && (
                    <NavLink className="px-4 py-4 hover:bg-green-400" to="/businesses/create">Add Business</NavLink>
                )}
                
                <NavLink className="px-4 py-4 hover:bg-green-400" to="/about">About</NavLink>
                
                {!isLoggedIn && (
                    <>
                        <NavLink className="px-4 py-4 hover:bg-green-400" to="/signup">SignUp</NavLink>
                        <NavLink className="px-4 py-4 hover:bg-green-400" to="/login">Login</NavLink>
                    </>
                )}

                {isLoggedIn && (
                    <button className="px-4 py-4 hover:bg-green-400" onClick={logOutUser}>Log out</button>
                )}
            </nav>
        </>
    )
}

export default NavBar;