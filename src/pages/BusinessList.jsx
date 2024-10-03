import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import businessService from "../services/business.services";

import defaultImageArcade from "/defaultImageArcade.jpg";
import defaultImageBakery from "/defaultImageBakery.jpg";
import defaultImageBookstore from "/defaultImageBookstore.webp";
import defaultImageCoffeeshop from "/defaultImageCoffeeshop.png";
import defaultImageFair from "/defaultImageFair.jpeg";
import defaultImageFitnessCenter from "/defaultImageFitnessCenter.jpg";
import defaultImageGardenCenter from "/defaultImageGardenCenter.jpg";
import defaultImageHotel from "/defaultImageHotel.jpg";
import defaultImageMovieTheater from "/defaultImageMovieTheater.jpg";
import defaultImageNightclub from "/defaultImageNightclub.jpg";
import defaultImageRestaurant from "/defaultImageRestaurant.jpg";
import defaultImageRetailStore from "/defaultImageRetailStore.jpg";
import defaultImageSupermarket from "/defaultImageSupermarket.jpg";
import defaultImageWellnessCenter from "/defaultImageWellnessCenter.jpg";
import NavBar from "../components/NavBar";
import reviewService from "../services/review.service";

function BusinessList () {

    const [ businesses, setBusinesses ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ query, setQuery ] = useState("");
    const [ reviews, setReviews ] = useState(null);
    
    // Variable used for the searchbar
    let filteredBusinesses;


    const getAllBusinesses = () => {
        businessService.getAllBusinesses()
            .then((response) => {
                setBusinesses(response.data);
                getImg(response.data.imageURL, response.data.category);
                setLoading(false); 
            })
            .catch((error) => {
                setError("Error fetching businesses. Please try again later.");
                setLoading(false); 
            });
    };

    const getAllReviews = () => {
        reviewService.getAllReviews()
            .then((response) => {
                setReviews(response.data)
            })
            .catch((error) => {
                console.log(error);
                setError(error);
            })
   
    };

    useEffect( () => {
        getAllBusinesses();
        getAllReviews();
    }, []);

    if(Array.isArray(businesses)) {
        // Function for filtering the businesses in the state variable based on the search query in the search bar
        filteredBusinesses = businesses.filter( (business) => {
           
            if(business.name && business.name.toLowerCase().includes(query.toLowerCase())){return true} else
            if(business.category && business.category.toLowerCase().includes(query.toLowerCase())){return true} else
            if(business.location && business.location.toLowerCase().includes(query.toLowerCase())){return true} else
            if(business.description && business.description.toLowerCase().includes(query.toLowerCase())){return true}
        });
    }

    const handleImageError = (e, category) => {
        // Function for getting a default image path for a business if there is no provided image or if the provided image is not valid
        switch (category) {
            case "arcade":
                e.target.src = defaultImageArcade;
                break;
            case "bakery":
                e.target.src = defaultImageBakery;
                break;
            case "bookstore":
                e.target.src = defaultImageBookstore;
                break;
            case "coffeeshop":
                e.target.src = defaultImageCoffeeshop;
                break;
            case "fair":
                e.target.src = defaultImageFair; 
                break;
            case "fitness center":
                e.target.src = defaultImageFitnessCenter; 
                break;
            case "garden center":
                e.target.src = defaultImageGardenCenter; 
                break;
            case "hotel":
                e.target.src = defaultImageHotel; 
                break;
            case "movie theater":
                e.target.src = defaultImageMovieTheater; 
                break;
            case "nightclub":
                e.target.src = defaultImageNightclub; 
                break;
            case "restaurant":
                e.target.src = defaultImageRestaurant;
                break;
            case "retail store":
                e.target.src = defaultImageRetailStore;
                break;
            case "supermarket":
                e.target.src = defaultImageSupermarket;
                break;
            case "wellness center":
                e.target.src = defaultImageWellnessCenter;
                break;
        }
    
    };

    const displayRating = (businessId) => {
        // Function for displaying the average star rating based on the reviews for each business
        let ratingSum = 0;
        let filteredReviews = reviews.filter((review) => review.business._id == businessId)
        for(let i=0; i<filteredReviews.length; i++){
            ratingSum += filteredReviews[i].rating;
        }
        let rating = Math.floor(ratingSum / (filteredReviews.length ? filteredReviews.length : 1));        
        let stars = `${"★".repeat(rating)}${"☆".repeat(5 - rating)}`;

        return `${stars}(${filteredReviews.length})`;
    }


    return (
        <div className="min-w-full">
            <NavBar>
                <div className="z-20 w-full mt-3 sm:w-auto text-xs lg:text-base flex justify-center sm:justify-start">
                    <span>Search</span>
                    <input className="ml-3 w-56 sm:w-36 lg:w-80 mr-4 rounded-md px-2 focus:outline-black" value={query} type="search" onChange={e => setQuery(e.target.value)}/>
                </div>
            </NavBar>

            <div className="pt-8 pb-16 mx-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
                    {Array.isArray(filteredBusinesses) && filteredBusinesses.length > 0 
                    ? filteredBusinesses.reverse().map( (business) => {

                        const imageURL = business.imageURL 
                            ? business.imageURL 
                            : (() => {
                                switch (business.category) {
                                    case "arcade":
                                        return defaultImageArcade;
                                    case "bakery":
                                        return defaultImageBakery;
                                    case "bookstore":
                                        return defaultImageBookstore;
                                    case "coffeeshop":
                                        return defaultImageCoffeeshop;
                                    case "fair":
                                        return defaultImageFair; 
                                    case "fitness center":
                                        return defaultImageFitnessCenter; 
                                    case "garden center":
                                        return defaultImageGardenCenter; 
                                    case "hotel":
                                        return defaultImageHotel; 
                                    case "movie theater":
                                        return defaultImageMovieTheater; 
                                    case "nightclub":
                                        return defaultImageNightclub; 
                                    case "restaurant":
                                        return defaultImageRestaurant;
                                    case "retail store":
                                        return defaultImageRetailStore;
                                    case "supermarket":
                                        return defaultImageSupermarket;
                                    case "wellness center":
                                        return defaultImageWellnessCenter;
                                    default:
                                        return defaultImageRestaurant; 
                                }
                            })();
        
                        return (
                            <div className="card box-border hover:bg-green-200 min-h-96 max-h-96 justify-center hover:scale-105" key={business._id}>
                                <Link to={`/businesses/${business._id}`}>
                                    <h3 className="mb-5 text-lg font-semibold  text-gray-700">{business.name}</h3>
                                    <img className="mx-auto h-48 object-fill rounded-md" src={imageURL} alt="business image" onError={(e) => handleImageError(e, business.category)}/>
                                    <div className="flex justify-between pb-auto">
                                        <p className="mt-7 text-sm md:text-base">{business.category.slice(0,1).toUpperCase() + business.category.slice(1)} in {business.location}</p>
                                        {reviews && <p className="mt-7 text-sm md:text-base">{displayRating(business._id)}</p>}
                                    </div>
                                </Link> 
                            </div>
                        );
                    }) 
                    : (loading 
                        ? <p className="card box-border mx-auto max-h-96 justify-center">Loading...</p> 
                        : <p className="card box-border mx-auto max-h-96 justify-center">{error.message}</p>)
                    }
                </div>
            </div>
        </div>
        
    )
}

export default BusinessList;


