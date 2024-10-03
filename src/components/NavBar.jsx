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
                            <NavLink className="text-xs lg:text-base hover:text-white" to={`/profile/${user._id}`}>
                                <button className="card flex bg-green-400 hover:bg-green-700 py-1 my-1 px-4 mx-1 rounded focus:shadow-outline">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" id="profile">
                                        <g fill="none" fillRule="evenodd" stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" transform="translate(1 7)">
                                            <circle cx="7.579" cy="4.778" r="4.778"></circle>
                                            <path d="M5.32907052e-15,16.2013731 C-0.00126760558,15.8654831 0.0738531734,15.5336997 0.219695816,15.2311214 C0.677361723,14.3157895 1.96797958,13.8306637 3.0389178,13.610984 C3.81127745,13.4461621 4.59430539,13.3360488 5.38216724,13.2814646 C6.84083861,13.1533327 8.30793524,13.1533327 9.76660662,13.2814646 C10.5544024,13.3366774 11.3373865,13.4467845 12.1098561,13.610984 C13.1807943,13.8306637 14.4714121,14.270023 14.929078,15.2311214 C15.2223724,15.8479159 15.2223724,16.5639836 14.929078,17.1807781 C14.4714121,18.1418765 13.1807943,18.5812358 12.1098561,18.7917621 C11.3383994,18.9634099 10.5550941,19.0766219 9.76660662,19.1304349 C8.57936754,19.2310812 7.38658584,19.2494317 6.19681255,19.1853548 C5.92221301,19.1853548 5.65676678,19.1853548 5.38216724,19.1304349 C4.59663136,19.077285 3.8163184,18.9640631 3.04807112,18.7917621 C1.96797958,18.5812358 0.686515041,18.1418765 0.219695816,17.1807781 C0.0745982583,16.8746908 -0.000447947969,16.5401098 5.32907052e-15,16.2013731 Z"></path>
                                        </g>
                                    </svg>
                                    {user.name}
                                </button>
                            </NavLink>

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
                                    <NavLink className="text-xs lg:text-base hover:text-white flex" to={`/profile/${user._id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" id="profile">
                                            <g fill="none" fillRule="evenodd" stroke="#200E32" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" transform="translate(4 7)">
                                                <circle cx="7.579" cy="4.778" r="4.778"></circle>
                                                <path d="M5.32907052e-15,16.2013731 C-0.00126760558,15.8654831 0.0738531734,15.5336997 0.219695816,15.2311214 C0.677361723,14.3157895 1.96797958,13.8306637 3.0389178,13.610984 C3.81127745,13.4461621 4.59430539,13.3360488 5.38216724,13.2814646 C6.84083861,13.1533327 8.30793524,13.1533327 9.76660662,13.2814646 C10.5544024,13.3366774 11.3373865,13.4467845 12.1098561,13.610984 C13.1807943,13.8306637 14.4714121,14.270023 14.929078,15.2311214 C15.2223724,15.8479159 15.2223724,16.5639836 14.929078,17.1807781 C14.4714121,18.1418765 13.1807943,18.5812358 12.1098561,18.7917621 C11.3383994,18.9634099 10.5550941,19.0766219 9.76660662,19.1304349 C8.57936754,19.2310812 7.38658584,19.2494317 6.19681255,19.1853548 C5.92221301,19.1853548 5.65676678,19.1853548 5.38216724,19.1304349 C4.59663136,19.077285 3.8163184,18.9640631 3.04807112,18.7917621 C1.96797958,18.5812358 0.686515041,18.1418765 0.219695816,17.1807781 C0.0745982583,16.8746908 -0.000447947969,16.5401098 5.32907052e-15,16.2013731 Z"></path>
                                            </g>
                                        </svg>
                                        {user.name}
                                    </NavLink>
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