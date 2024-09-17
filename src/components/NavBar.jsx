import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { NavLink } from "react-router-dom";

function NavBar ({ children }) {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const [isNavOpen, setIsNavOpen] = useState(false);


    return (
        <>
            <nav className="bg-green-300 flex flex-row items-center justify-around w-full z-10 border lg:pr-4 border-b-green-400">

                {/* LOGO */}
                <div className="flex">
                    <NavLink to="/">
                        <img className="md:ml-5 md:h-14 z-22 flex w-auto h-12 md:w-auto" src="../../local-findie-logo.gif" alt="" />
                    </NavLink>
                </div>   



                {/* DESKTOP SCREENS */}
                <div className="flex-col items-center w-full sm:w-auto sm:flex-row sm:flex-grow md:justify-end md:gap-3 justify-between mx-2 hidden lg:flex md:flex">

                    <div className="w-full md:ml-3 sm:w-auto flex justify-start sm:mb-3">{children}</div>

                    <div className="flex justify-end items-center">
                        <NavLink className="text-xs lg:text-base hover:text-white" to="/"><button className="card bg-green-400 hover:bg-green-700 py-1 my-1 px-4 mx-1 rounded focus:shadow-outline">Home</button></NavLink>
                        <NavLink className="text-xs lg:text-base hover:text-white" to="/businesses"><button className="card bg-green-400 hover:bg-green-700 py-1 my-1 px-4 mx-1 rounded focus:shadow-outline">Businesses</button></NavLink>
                        
                        {isLoggedIn && (
                            <NavLink className="text-xs lg:text-base hover:text-white" to="/businesses/create"><button className="card bg-green-400 hover:bg-green-700 py-1 my-1 px-4 mx-1 rounded focus:shadow-outline">Add Business</button></NavLink>
                        )}
                        
                        <NavLink className="text-xs lg:text-base hover:text-white" to="/about"><button className="card bg-green-400 hover:bg-green-700 py-1 my-1 px-4 mx-1 rounded focus:shadow-outline">About</button></NavLink>
                        
                        {!isLoggedIn && (
                            <>
                                <NavLink className="text-xs lg:text-base hover:text-white" to="/signup"><button className="card bg-green-400 hover:bg-green-700 py-1 my-1 px-4 mx-1 rounded focus:shadow-outline">Sign up</button></NavLink>
                                <NavLink className="text-xs lg:text-base hover:text-white" to="/login"><button className="card bg-green-400 hover:bg-green-700 py-1 my-1 px-4 mx-1 rounded focus:shadow-outline">Login</button></NavLink>
                            </>
                        )}

                        {isLoggedIn && (
                            // <button className="text-xs lg:text-base card bg-green-400 hover:bg-green-700 py-1 my-1 px-4 mx-1 rounded focus:shadow-outline" onClick={logOutUser}>{user.name}</button>
                            <NavLink className="text-xs lg:text-base hover:text-white" to={`/profile/${user._id}`}><button className="card bg-green-400 hover:bg-green-700 py-1 my-1 px-4 mx-1 rounded focus:shadow-outline">{user.name}</button></NavLink>

                        )}
                    </div>
                </div>



                {/* MOBILE SCREENS */}
                <div className="flex">
                    <section className="flex md:hidden lg:hidden">
                    <div
                        className="space-y-2"
                        onClick={() => setIsNavOpen((prev) => !prev)}
                    >
                        <span className="block h-0.5 w-8 bg-gray-600"></span>
                        <span className="block h-0.5 w-8 bg-gray-600"></span>
                        <span className="block h-0.5 w-8 bg-gray-600"></span>
                    </div>

                    <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
                        <div
                        className="absolute top-0 right-0 px-8 py-8"
                        onClick={() => setIsNavOpen(false)}
                        >
                        <svg
                            className="h-8 w-8 text-gray-600"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        </div>
                        <ul className="flex flex-col items-center justify-between min-h-[250px]">

                            <li className="border-b border-gray-400 my-8 uppercase">
                                <NavLink className="text-xs lg:text-base hover:text-white" to="/">Home</NavLink>
                            </li>

                            <li className="border-b border-gray-400 my-8 uppercase">
                                <NavLink className="text-xs lg:text-base hover:text-white" to="/businesses">Businesses</NavLink>
                            </li>
                            
                            {isLoggedIn && (
                                <li className="border-b border-gray-400 my-8 uppercase">
                                    <NavLink className="text-xs lg:text-base hover:text-white" to="/businesses/create">Add Business</NavLink>
                                </li>
                            )}
                            
                            <li className="border-b border-gray-400 my-8 uppercase">
                                <NavLink className="text-xs lg:text-base hover:text-white" to="/about">About</NavLink>
                            </li>
                            
                            {!isLoggedIn && (
                                <li className="border-b border-gray-400 my-8 uppercase">
                                        <NavLink className="text-xs lg:text-base hover:text-white" to="/signup">Sign up</NavLink>
                                </li>
                            )}
                            {!isLoggedIn && (
                                <li className="border-b border-gray-400 my-8 uppercase">
                                    <NavLink className="text-xs lg:text-base hover:text-white" to="/login">Login</NavLink>
                                </li>
                            )}
                            
                            
                            <li className="border-b border-gray-400 my-8 uppercase">
                                {isLoggedIn && (
                                    <NavLink className="text-xs lg:text-base hover:text-white" to={`/profile/${user._id}`}>{user.name}</NavLink>
                                )}
                            </li>

                        </ul>
                    </div>
                    </section>
                </div>
                <style>{`
                    .hideMenuNav {
                        display: none;
                    }
                    .showMenuNav {
                        display: block;
                        position: absolute;
                        width: 100%;
                        height: 100vh;
                        top: 0;
                        left: 0;
                        background: rgb(187 247 208);
                        z-index: 10;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-evenly;
                        align-items: center;
                    }
                `}</style>
            </nav>
        </>
    )
}

export default NavBar;