import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import businessService from "../services/business.services";

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
            return  (
                    business.name.toLowerCase().includes(value.toLowerCase())
                    || business.category.toLowerCase().includes(value.toLowerCase())
                    || business.location.toLowerCase().includes(value.toLowerCase())
                    || business.description.toLowerCase().includes(value.toLowerCase())
            )   
        });
    }
    

    return (
        <>
            <div>
                Search
                <input value={query} type="search" onChange={e => setQuery(e.target.value)}/>
            </div>

            {Array.isArray(filteredBusinesses) && filteredBusinesses.length > 0 
            ? filteredBusinesses.map( (business) => {
                return (
                <div key={business._id}>
                    <Link to={`/businesses/${business._id}`}>
                        <h3>{business.name}</h3>
                        <img src={business.imageUrl} alt="business image" />
                        <p>{business.location}</p>
                    </Link> 
                </div>) 
            }) 
            : <p>No businesses found.</p>}
        </>
    )
}

export default BusinessList;


