import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import businessService from "../services/business.services";
import reviewService from "../services/review.service";
import { AuthContext } from "../context/auth.context";

import defaultImageArcade from "/defaultImageArcade.jpg";
import defaultImageBookstore from "/defaultImageBookstore.webp";
import defaultImageCoffeeshop from "/defaultImageCoffeeshop.png";
import defaultImageFair from "/defaultImageFair.jpeg";
import defaultImageRestaurant from "/defaultImageRestaurant.jpg";
import NavBar from "../components/NavBar";

function BusinessDetails () {
    const [ currentBusiness, setCurrentBusiness ] = useState(null);
    const [ currentReviews, setCurrentReviews ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const { businessId } = useParams();
    const { isLoggedIn } = useContext(AuthContext)
    const [ imageSrc, setImageSrc ] = useState(null);

    const navigate = useNavigate();
    
    const getSpecificBusiness = () => {
        businessService.getBusiness(businessId)
            .then((response) => {
                setCurrentBusiness(response.data);
                getImg(response.data.imageURL, response.data.category);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    const getSpecificBusinessReviews = () => {
        reviewService.getReviews(businessId)
            .then((response) => {
                setCurrentReviews(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getSpecificBusiness();
        getSpecificBusinessReviews();
    }, [businessId]);


    const deleteBusiness = () => {
        
        businessService.deleteBusiness(businessId)
            .then((response) => {
                navigate("/businesses");
            })
            .catch((err) => console.log(err));
    }

    const formatOpeningHours = (openingHours) => {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return days.map(day => {
            const fromKey = `${day.toLowerCase().slice(0, 3)}From`;
            const tillKey = `${day.toLowerCase().slice(0, 3)}Till`;
            const from = openingHours[fromKey];
            const till = openingHours[tillKey];
            return from && till ? `${day}: ${from} - ${till}` : `${day}: Closed`;
        });
    }

    const isValidImageURL = (url, callback) => {
        const img = new Image();
        img.onload = () => callback(true);
        img.onerror = () => callback(false);
        img.src = url;
    };

    const getImg = (imageURL, category) => {
        isValidImageURL(imageURL, (isValid) => {
            if (isValid) {
            setImageSrc(imageURL);
            } else {
            switch (category) {
                case 'arcade':
                setImageSrc(defaultImageArcade);
                break;
                case 'bookstore':
                setImageSrc(defaultImageBookstore);
                break;
                case 'coffeeshop':
                setImageSrc(defaultImageCoffeeshop);
                break;
                case 'fair':
                setImageSrc(defaultImageFair);
                break;
                case 'restaurant':
                setImageSrc(defaultImageRestaurant);
                break;
                default:
                setImageSrc(defaultImageRestaurant);
            }
            }
        });
    };


    const displayRating = (rating) => {
        let stars = `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;

        return stars;
    }

    return (
        <>  
            <NavBar/>
            <div className="pt-20 flex flex-col items-center container mx-auto p-4">
                <div className="card box-border w-full sm:w-11/12 md:w-10/12 lg:w-8/12 min-h-96 m-3 flex">
                    {loading && <p className="block text-gray-700 text-lg font-semibold mb-4 text-center mt-6">Loading...</p>}
                    {error && <p className="block text-gray-700 text-lg font-semibold mb-4 text-center mt-6 mx-auto">Error fetching business from database</p>}


                    {currentBusiness
                        && (
                            <div className="flex flex-col items-center">
                                <h3 className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold">{currentBusiness.name}</h3>

                                <div key={currentBusiness._id} className="w-full flex flex-col md:flex-row justify-around py-5">
                                    <div className="w-full sm:w-4/5 sm:mx-auto md:w-5/12">
                                        <img src={imageSrc} alt="business image" className="rounded-lg border-2 border-green-700"/>
                                    </div>

                                    <div className="w-full md:w-4/12">
                                        <h3 className="mt-4 sm:mt-0 md:mx-4 text-md md:text-lg text-gray-700 font-semibold mb-2">Details</h3>
                                        <h4 className="md:mx-4 text-sm sm:text-md mt-2">A{currentBusiness.category.match('^[aieouAIEOU].*') && "n"} {currentBusiness.category} in {currentBusiness.location} that's been around since {currentBusiness.foundedYear}</h4>
                                        <h3 className="md:mx-4 text-md md:text-lg text-gray-700 font-semibold mb-2 mt-4">Description:</h3>
                                        <p className="md:mx-4 text-sm md:text-md mt-2">{currentBusiness.description}</p>
                                        {currentBusiness.websiteURL	&& 
                                            <>
                                                <h3 className="md:mx-4 text-md md:text-lg text-gray-700 font-semibold mb-2 mt-4">Contact:</h3>
                                                <a className="font-bold text-blue-600 md:mx-4 text-sm md:text-md mt-2" target="_blank" href={currentBusiness.websiteURL}>Website link</a>
                                            </>
                                        }
                                    </div>

                                    <div className="flex flex-col md:w-3/12">
                                        <h3 className="text-md md:text-lg text-gray-700 font-semibold mt-4 sm:mt-0 mb-2">Opening Hours</h3>
                                        {currentBusiness.openingHours && formatOpeningHours(currentBusiness.openingHours).map((hours, index) => (
                                            <p className="text-xs sm:text-sm md:text-md py-1" key={index}>{hours}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                        
                    }
                </div>

                <div className="card box-border w-full sm:w-11/12 md:w-10/12 lg:w-8/12 max-h-96 flex flex-col md:flex-row items-center justify-center m-3">
                    {isLoggedIn && !error  &&
                    
                        <>
                            <Link to={`/businesses/edit/${businessId}`}>
                                <button className="card bg-green-500 hover:bg-green-700 text-white font-bold py-2 my-1 px-4 mx-1 rounded focus:shadow-outline">
                                    Edit Business
                                </button>
                            </Link>

                            <button onClick={deleteBusiness} className="card bg-red-500 hover:bg-red-700 text-white font-bold py-2 my-1 px-4 mx-1 rounded focus:shadow-outline">
                                Delete Business
                            </button>
                        </>
                    
                    }

                    <Link to={"/businesses"}>
                        <button className="card bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-1 px-4 mx-1 rounded focus:shadow-outline">Back to Overview</button>
                    </Link>
                </div>


                {!error &&
                    <div className="card box-border w-full sm:w-11/12 md:w-10/12 lg:w-8/12 flex flex-col items-center m-3 mb-16">
                        <h3 className="text-xl md:text-2xl text-gray-700 font-semibold mb-4">Reviews</h3>
                        {currentReviews && currentReviews.length > 0 
                            ? (currentReviews.map((review) => {
                                return(
                                    
                                    <div key={review._id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
                                        <p className="text-lg font-semibold">{review.title}</p>
                                        <hr className="my-2"/>
                                        <p className="text-sm text-gray-600">Written by: {review.author.name}</p>
                                        <p className="mt-2 text-sm md:text-base">{review.text}</p>
                                        <p className="mt-2 text-sm md:text-base">{displayRating(review.rating)}</p>
                                    </div>
                                )
                            }))
                            : (<p className="text-gray-500">No reviews found for this business, {isLoggedIn ? "leave a review below!" : "log in and leave a review!"}</p>)
                        }

                        {isLoggedIn && <ReviewForm getSpecificBusinessReviews={getSpecificBusinessReviews}/>}
                    </div>
                }

        
            </div>
        </>
    )
}

export default BusinessDetails;