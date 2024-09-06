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
    const [query, setQuery] = useState("");

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
        <div className="flex-col mx-5 h-full w-full pt-14">
            <div className="flex py-3 px-5 bg-slate-300 max-w-xs h-12 my-5 mx-2 rounded-md">
                <span>Search</span>
                <input className="mx-5" value={query} type="search" onChange={e => setQuery(e.target.value)}/>
            </div>
            
            <div className="flex">
                {Array.isArray(filteredBusinesses) && filteredBusinesses.length > 0 
                ? filteredBusinesses.map( (business) => {
                    
                    return (
                    <div className="card box-border hover:bg-green-200 m-2 min-h-96 min-w-72 justify-center" key={business._id}>
                        <Link to={`/businesses/${business._id}`}>
                            <h3 className="my-3">{business.name}</h3>
                            <img className="min-w-60 min-h-48 object-cover" src={getImg(business)} alt="business image" />
                            <p className="mt-7">{business.category.slice(0,1).toUpperCase() + business.category.slice(1)}</p>
                            <p className="my-3">{business.location}</p>
                        </Link> 
                    </div>) 
                }) 
                : <p>No businesses found.</p>}
            </div>
        </div>
    )
}

export default BusinessList;


