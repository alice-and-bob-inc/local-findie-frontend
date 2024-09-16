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

function BusinessList () {

    const [ businesses, setBusinesses ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ query, setQuery ] = useState("");
    

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

    useEffect( () => {
        getAllBusinesses();
    }, []);

    if(Array.isArray(businesses)) {
        filteredBusinesses = businesses.filter( (business) => {
           
            if(business.name && business.name.toLowerCase().includes(query.toLowerCase())){return true} else
            if(business.category && business.category.toLowerCase().includes(query.toLowerCase())){return true} else
            if(business.location && business.location.toLowerCase().includes(query.toLowerCase())){return true} else
            if(business.description && business.description.toLowerCase().includes(query.toLowerCase())){return true}
        });
    }

    const handleImageError = (e, category) => {
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
                                    <p className="mt-7">{business.category.slice(0,1).toUpperCase() + business.category.slice(1)}</p>
                                    <p className="my-3">{business.location}</p>
                                </Link> 
                            </div>
                        );
                    }) 
                    : (loading 
                        ? <p className="card box-border mx-auto max-h-96 justify-center">Loading...</p> 
                        : <p className="card box-border mx-auto max-h-96 justify-center">{error}</p>)
                    }
                </div>
            </div>
        </div>
        
    )
}

export default BusinessList;


