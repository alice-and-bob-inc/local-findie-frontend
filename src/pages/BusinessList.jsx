import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import businessService from "../services/business.services";

import defaultImageArcade from "/defaultImageArcade.jpg";
import defaultImageBookstore from "/defaultImageBookstore.webp";
import defaultImageCoffeeshop from "/defaultImageCoffeeshop.png";
import defaultImageFair from "/defaultImageFair.jpeg";
import defaultImageRestaurant from "/defaultImageRestaurant.jpg";
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
    
    
    const getImg = (category) => {
        switch (category) {
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
            <NavBar>
                <div className="max-w-md mx-10 my-4 z-20">
                    <span>Search</span>
                    <input className="mx-5 min-w-80 rounded-md px-2 focus:outline-black" value={query} type="search" onChange={e => setQuery(e.target.value)}/>
                </div>
            </NavBar>

            <div className="pt-24 pb-16 mx-5">
                <div className="grid grid-cols-4 gap-5 justify-center">
                    {Array.isArray(filteredBusinesses) && filteredBusinesses.length > 0 
                    ? filteredBusinesses.map( (business) => {
                        
                        return (
                            <div className="card box-border hover:bg-green-200 min-h-96 max-h-96 justify-center hover:scale-105" key={business._id}>
                                <Link to={`/businesses/${business._id}`}>
                                    <h3 className="mb-5 text-lg font-semibold  text-gray-700">{business.name}</h3>
                                    <img className="mx-auto h-48 object-fill rounded-md" src={getImg(business.category)} alt="business image" />
                                    <p className="mt-7">{business.category.slice(0,1).toUpperCase() + business.category.slice(1)}</p>
                                    <p className="my-3">{business.location}</p>
                                </Link> 
                            </div>) 
                        }) 
                    : <p className="card box-border mx-auto max-h-96 justify-center">No businesses found.</p>}
                </div>
            </div>
        </div>
        
    )
}

export default BusinessList;


