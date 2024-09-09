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

function BusinessDetails () {
    const [ currentBusiness, setCurrentBusiness ] = useState(null);
    const [ currentReviews, setCurrentReviews ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const { businessId } = useParams();
    const { isLoggedIn } = useContext(AuthContext)

    const navigate = useNavigate();
    
    const getSpecificBusiness = () => {
        businessService.getBusiness(businessId)
            .then((response) => {
                setCurrentBusiness(response.data);
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

    const getImg = (business) => {
        if(business.imageURL) {
            return business.imageURL;
        } else  switch (business.category) {
            case "restaurant":
                return defaultImageRestaurant;
            case "bookstore":
                return defaultImageBookstore;
            case "coffeeshop":
                return defaultImageCoffeeshop;
            case "arcade":
                return defaultImageArcade;
            case "fair":
                return defaultImageFair; 
        }
    }

    return (
        <>  
            <div className="pt-16 flex flex-col items-center container mx-auto p-4">
                <div className="card box-border w-10/12 min-h-96 m-3 flex">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error fetching business from database...</p>}

                    {currentBusiness
                        ? (
                            <div className="flex flex-col items-center">
                                <h3 className="text-3xl font-semibold">{currentBusiness.name}</h3>

                                <div key={currentBusiness._id} className="w-full flex justify-around py-5">
                                    <div className="w-5/12">
                                        <img src={getImg(currentBusiness)} alt="business image" className="rounded-lg border-2 border-green-700"/>
                                    </div>

                                    <div className="px-5 w-4/12">
                                        <h3 className="text-xl font-semibold">Details</h3>
                                        <h4>A{currentBusiness.category.match('^[aieouAIEOU].*') && "n"} {currentBusiness.category} in {currentBusiness.location} that's been around since {currentBusiness.foundedYear}</h4>
                                        <br />
                                        <br />
                                        <h4 className="text-xl font-semibold">Description:</h4>
                                        <p>{currentBusiness.description}</p>
                                    </div>

                                    <div className="flex flex-col w-3/12"> {/* justify-center ? */}
                                        <h3 className="text-xl font-semibold">Opening Hours</h3>
                                        {currentBusiness.openingHours && formatOpeningHours(currentBusiness.openingHours).map((hours, index) => (
                                            <p key={index}>{hours}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                        
                        : (navigate("/notfoundpage"))  
                    }
                </div>

                <div className="card box-border w-10/12 max-h-96 justify-center m-3 flex">
                    {isLoggedIn &&
                        <>
                            <Link to={`/businesses/edit/${businessId}`}>
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded focus:shadow-outline">
                                    Edit Business
                                </button>
                            </Link>

                            <button onClick={deleteBusiness} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-1 rounded focus:shadow-outline">
                                Delete Business
                            </button>
                        </>
                    }

                    <Link to={"/businesses"}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-1 rounded focus:shadow-outline">Back to Overview</button>
                    </Link>
                </div>

                <div className="card box-border w-10/12 justify-center m-3 mb-16 flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-4">Reviews</h3>
                    {currentReviews && currentReviews.length > 0 
                        ? (currentReviews.map((review) => {
                            return(
                                
                                <div key={review._id} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
                                    <p className="text-lg font-semibold">{review.title}</p>
                                    <hr className="my-2"/>
                                    <p className="text-sm text-gray-600">Written by:{review.author.name}</p>
                                    <p className="mt-2">{review.text}</p>
                                    <hr />
                                </div>
                            )
                        }))
                        : (<p className="text-gray-500">No reviews found for this business, leave a review above!</p>)
                    }

                    {isLoggedIn && <ReviewForm getSpecificBusinessReviews={getSpecificBusinessReviews}/>}
                </div>

        
            </div>
        </>
    )
}

export default BusinessDetails;