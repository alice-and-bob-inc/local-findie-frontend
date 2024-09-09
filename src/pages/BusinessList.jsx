import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import businessService from "../services/business.services";

import defaultImageArcade from "/defaultImageArcade.jpg";
import defaultImageBookstore from "/defaultImageBookstore.webp";
import defaultImageCoffeeshop from "/defaultImageCoffeeshop.png";
import defaultImageFair from "/defaultImageFair.jpeg";
import defaultImageRestaurant from "/defaultImageRestaurant.jpg";

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
        <div className="min-w-full">
            <div className="fixed top-0 left-7 max-w-md my-4 z-20">
                <span>Search</span>
                <input className="mx-5 min-w-80 rounded-md px-2 focus:outline-black" value={query} type="search" onChange={e => setQuery(e.target.value)}/>
            </div>

            <div className="pt-20 pb-12 mx-5">
                <div className="grid grid-cols-4 gap-5 justify-center">
                    {Array.isArray(filteredBusinesses) && filteredBusinesses.length > 0 
                    ? filteredBusinesses.map( (business) => {
                        
                        return (
                            <div className="card box-border hover:bg-green-200 min-h-96 max-h-96 justify-center hover:scale-105" key={business._id}>
                                <Link to={`/businesses/${business._id}`}>
                                    <h3 className="mb-5">{business.name}</h3>
                                    <img className="min-w-full min-h-48 max-h-48 object-fill" src={getImg(business)} alt="business image" />
                                    <p className="mt-7">{business.category.slice(0,1).toUpperCase() + business.category.slice(1)}</p>
                                    <p className="my-3">{business.location}</p>
                                </Link> 
                            </div>) 
                        }) 
                    : <p>No businesses found.</p>}
                </div>
            </div>
        </div>
        
    )
}

export default BusinessList;


