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
                    break;
                case "bookstore":
                    return defaultImageBookstore;
                    break;
                case "coffeeshop":
                    return defaultImageCoffeeshop;
                    break;
                case "arcade":
                    return defaultImageArcade;
                    break;
                case "fair":
                    return defaultImageFair; 
                    break;
            }
    }

    return (
        <div className="mx-5 min-h-full">
            <div className="flex-wrap py-5 px-5 bg-slate-300 max-w-xs my-5 mx-2 rounded-md">
                <span>Search</span>
                <input className="mx-5" value={query} type="search" onChange={e => setQuery(e.target.value)}/>
            </div>

            <div className="flex">
                {Array.isArray(filteredBusinesses) && filteredBusinesses.length > 0 
                ? filteredBusinesses.map( (business) => {
                    
                    return (
                    <div className="card flex hover:bg-green-200 m-2 w-1/4 h-96 justify-center" key={business._id}>
                        <Link to={`/businesses/${business._id}`}>
                            <h3>{business.name}</h3>
                            <img className="min-w-max" src={getImg(business)} alt="business image" />
                            <p>{business.location}</p>
                            <p>{business.category}</p>
                        </Link> 
                    </div>) 
                }) 
                : <p>No businesses found.</p>}
            </div>
        </div>
    )
}

export default BusinessList;


