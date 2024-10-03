import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/auth.context"
import NavBar from "../components/NavBar";
import businessService from "../services/business.services";
import reviewService from "../services/review.service";
import { Link } from "react-router-dom";
import authService from "../services/auth.services";


export default function ProfilePage(){
    const [ businesses, setBusinesses ] = useState(null);
    const [ reviews, setReviews ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ favouritesId, setFavouritesId ] = useState(null);
    const [ favourites, setFavourites ] = useState([]);
    const { user, logOutUser, isLoggedIn } = useContext(AuthContext);


    const getUserBusinesses = () => {
        businessService.getUserBusinesses(user._id)
            .then((response) => {
                setBusinesses(response.data);
            })
            .catch((error) => {
                setError(error);
            })
    }

    const getUserReviews = () => {
        reviewService.getUserReviews(user._id)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                setError(error);
            })
    }

    const getFavouritesId = () => {
        if(isLoggedIn && user && user._id){
            authService.getUserInfo(user._id)
                .then((response) => {
                    const resUserInfo = response.data;
                    setFavouritesId(resUserInfo);
                    // getFavouriteBusinesses(resUserInfo);
                })
                .catch((error) => {
                    setError(error);
                    console.log(error)
                })
        }
    }

    const getFavouriteBusinesses = async (favouriteIds) => {
        let newFavourites = [];
        if (favouriteIds) {
            try {
                const favouritePromises = favouriteIds.favourites.map((id) =>
                    businessService.getBusiness(id)
                );
                const favouriteResponses = await Promise.all(favouritePromises);
                newFavourites = favouriteResponses.map((response) => response.data);
                setFavourites(newFavourites);
            } catch (error) {
                setError(error);
                console.log(error);
            }
        }
    };

    useEffect( () => {
        getUserBusinesses();
        getUserReviews();
        getFavouritesId();
    }, [])

    useEffect(() => {
        getFavouriteBusinesses(favouritesId)
    }, [favouritesId])

    const displayRating = (rating) => {
        // Function for displaying the rating field in the review object as stars
        let stars = `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;

        return stars;
    }

    return(
        <>
            <NavBar />
            {user &&
                <div className="
                    card mt-8 mx-6
                    md:mx-12 md:p-6
                    lg:mx-36 lg:p-8"
                >
                    <h1 className="text-lg font-bold mb-4">Logged in as: {user.name}</h1>
                    <h2 className="my-1">Name: {user.name}</h2>
                    <h2 className="my-1">Email: {user.email}</h2>
                    <h2 className="my-1">Password: ********</h2>
                    <div className="flex w-full justify-end">
                        <button className="card bg-red-500 hover:bg-red-700 text-white font-bold py-2 my-1 px-4 mx-1 rounded focus:shadow-outline" onClick={logOutUser}>Log out</button>
                    </div>
                </div>
            }

            <div className="
                card shadow-md flex flex-col items-center rounded-lg mt-4 mx-6 p-6 mb-4
                md:p-6 md:flex-row md:flex-wrap md:mx-12
                lg:p-8 lg:flex-row lg:flex-wrap lg:mx-36"
            >
                <h1 className="text-lg font-bold mb-4 w-full">Your Businesses</h1>

                {businesses && businesses.length > 0 ? businesses.map((business) => {
                    return (
                        <Link key={business._id} to={`/businesses/${business._id}`} className="
                        bg-white shadow-md rounded-lg p-4 w-11/12 mb-2
                        md:mx-auto md:w-5/12 md:mb-4
                        lg:mx-auto lg:w-5/12 lg:mb-4
                        hover:bg-green-200 hover:scale-105"
                        >
                            <p className="text-lg font-semibold">{business.name}</p>
                            <hr className="my-2"/>
                            <p className="text-sm text-gray-600">{business.category} in {business.location}</p>
                        </Link>
                    )
                }) : 
                (<h1 className="mb-4">No Businesses yet.</h1>)
                }
            </div>






            <div className="
                card shadow-md flex flex-col items-center rounded-lg mt-4 mx-6 p-6 mb-4
                md:p-6 md:flex-row md:flex-wrap md:mx-12
                lg:p-8 lg:flex-row lg:flex-wrap lg:mx-36"
            >
                <h1 className="text-lg font-bold mb-4 w-full">Your Favourites</h1>

                {favourites && favourites.length > 0 ? favourites.map((favourite) => {
                    return (
                        <Link key={favourite._id} to={`/businesses/${favourite._id}`} className="
                        bg-white shadow-md rounded-lg p-4 w-11/12 mb-2
                        md:mx-auto md:w-5/12 md:mb-4
                        lg:mx-auto lg:w-5/12 lg:mb-4
                        hover:bg-green-200 hover:scale-105"
                        >
                            <p className="text-lg font-semibold">{favourite.name}</p>
                            <hr className="my-2"/>
                            <p className="text-sm text-gray-600">{favourite.category} in {favourite.location}</p>
                        </Link>
                    )
                }) : 
                (<h1 className="mb-4">No Favourites yet.</h1>)
                }
            </div>







            <div className="
                card mt-2 mx-6 p-6
                md:p-6 md:mx-12
                lg:p-8 lg:mx-36"
            >
                <h1 className="text-lg font-bold mb-4">Your Reviews</h1>

                {reviews && reviews.map((review) => {
                    return (
                        <div key={review._id} className="
                            bg-green-100 shadow-md flex flex-col items-center rounded-lg p-2 mb-6 w-full
                            md:p-4 md:flex-row md:items-stretch
                            lg:p-8 lg:flex-row lg:items-stretch"
                        >
                            <Link to={`/businesses/${review.business._id}`} className="
                                bg-white shadow-md rounded-lg p-4 w-full
                                md:mx-1 md:w-1/2 md:mb-4
                                lg:mx-1 lg:w-1/2 lg:mb-4
                                hover:bg-green-200 hover:scale-105"
                            >
                                <p className="text-lg font-semibold">{review.business.name}</p>
                                <hr className="my-2"/>
                                <p className="text-sm text-gray-600">{review.business.category} in {review.business.location}</p>
                                {user && user._id === review.author._id &&
                                    <button 
                                        onClick={() => {deleteReview(review._id, review.author._id)}}
                                        className="card bg-red-500 hover:bg-red-700 text-white font-bold text-sm py-2 my-1 px-4 mx-1 rounded focus:shadow-outline"
                                    >
                                        Delete
                                    </button>
                                }
                            </Link>
                            <p className="my-auto">-</p>
                            <Link to={`/businesses/${review.business._id}`} className="
                                bg-white shadow-md rounded-lg p-4 w-full
                                md:mx-1 md:w-1/2 md:mb-4
                                lg:mx-1 lg:w-1/2 lg:mb-4
                                hover:bg-green-200 hover:scale-105"
                            >
                                <p className="text-lg font-semibold">{review.title}</p>
                                <hr className="my-2"/>
                                <p className="text-sm text-gray-600">Written by you</p>
                                <p className="mt-2 text-sm md:text-base">{review.text}</p>
                                <p className="mt-2 text-sm md:text-base">{displayRating(review.rating)}</p>
                                {user && user._id === review.author._id &&
                                    <button 
                                        onClick={() => {deleteReview(review._id, review.author._id)}}
                                        className="card bg-red-500 hover:bg-red-700 text-white font-bold text-sm py-2 my-1 px-4 mx-1 rounded focus:shadow-outline"
                                    >
                                        Delete
                                    </button>
                                }
                            </Link>
                        </div>
                    )
                })}
            </div>

        </>
    )
}