import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function BusinessList () {

    const [ businesses, setBusinesses ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    const getAllBusinesses = () => {
        axios.get("http://localhost:5005/api/businesses")
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
    

    return (
        <>
            {businesses && businesses.length > 0 
            ? businesses.map( (business) => {
                return (
                <div key={business._id}>
                    <Link to={`/businesses/${business._id}`}>
                        <h3>{business.name}</h3>
                        <img src={`${business.imageUrl}`} alt="business image" />
                        <p>{business.location}</p>
                    </Link> 
                </div>) 
            }) 
            : <p>No businesses found.</p>}
        </>
    )
}

export default BusinessList;


