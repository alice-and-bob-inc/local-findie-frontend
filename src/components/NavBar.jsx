import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";

function NavBar ({ children }) {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
        <>
            <nav className="bg-green-300 flex flex-col sm:flex-row items-center justify-between fixed top-0 w-full z-10 border border-b-green-400">
                <div className="hidden md:block">
                    <NavLink to="/">
                        <img className="md:ml-2 md:h-10 z-22 w-0 h-0 md:w-auto" src="../../local-findie-logo.gif" alt="" />
                    </NavLink>
                </div>   

                <div className="flex flex-col items-center w-full sm:w-auto sm:flex-row sm:flex-grow md:justify-end md:gap-3 justify-between mx-2">

                    <div className="w-full md:ml-3 sm:w-auto flex justify-start sm:mb-3">{children}</div>

                    <div className="flex justify-end">
                        <NavLink className="px-2 py-2 text-xs md:text-sm lg:text-base hover:text-white" to="/">Home</NavLink>
                        <NavLink className="px-2 py-2 text-xs md:text-sm lg:text-base hover:text-white" to="/businesses">Businesses</NavLink>
                        
                        {isLoggedIn && (
                            <NavLink className="px-2 py-2 text-xs md:text-sm lg:text-base hover:text-white" to="/businesses/create">Add Business</NavLink>
                        )}
                        
                        <NavLink className="px-2 py-2 text-xs md:text-sm lg:text-base hover:text-white" to="/about">About</NavLink>
                        
                        {!isLoggedIn && (
                            <>
                                <NavLink className="px-2 py-2 text-xs md:text-sm lg:text-base hover:text-white" to="/signup">SignUp</NavLink>
                                <NavLink className="px-2 py-2 text-xs md:text-sm lg:text-base hover:text-white" to="/login">Login</NavLink>
                            </>
                        )}

                        {isLoggedIn && (
                            <button className="px-2 py-2 text-xs md:text-sm lg:text-base hover:text-white" onClick={logOutUser}>Log out</button>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;