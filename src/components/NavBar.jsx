import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";

function NavBar () {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <>
            <nav className="bg-green-300 px-5 flex justify-end fixed top-0 min-w-full z-10 border border-green-400">
                <NavLink className="px-4 py-4 hover:text-white" to="/">Home</NavLink>
                <NavLink className="px-4 py-4 hover:text-white" to="/businesses">Businesses</NavLink>
                
                {isLoggedIn && (
                    <NavLink className="px-4 py-4 hover:text-white" to="/businesses/create">Add Business</NavLink>
                )}
                
                <NavLink className="px-4 py-4 hover:text-white" to="/about">About</NavLink>
                
                {!isLoggedIn && (
                    <>
                        <NavLink className="px-4 py-4 hover:text-white" to="/signup">SignUp</NavLink>
                        <NavLink className="px-4 py-4 hover:text-white" to="/login">Login</NavLink>
                    </>
                )}

                {isLoggedIn && (
                    <button className="px-4 py-4 hover:text-white" onClick={logOutUser}>Log out</button>
                )}
            </nav>
        </>
    )
}

export default NavBar;