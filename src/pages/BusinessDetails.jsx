import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ReviewFormComponent from "../components/ReviewFormComponent";

function BusinessDetails () {
    const [ currentBusiness, setCurrentBusiness ] = useState(null);
    const [ currentReviews, setCurrentReviews ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const { businessId } = useParams();


    const getSpecificBusiness = () => {
        axios.get(`http://localhost:5005/api/businesses/${businessId}`)
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
        axios.get(`http://localhost:5005/api/businesses/${businessId}/reviews`)
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
        axios.delete(`http://api/businesses/${businessId}`)
            .then((response) => {
                navigate("/businesses");
            })
            .catch((err) => console.log(err));
    };


    return (
        <>

            {loading && <p>Loading...</p>}
            {error && <p>Error fetching business from database...</p>}


            {currentBusiness
                ? (
                    <div key={currentBusiness._id}>
                        <h3>{currentBusiness.name}</h3>
                        <h4>A {currentBusiness.category} in {currentBusiness.location} that's been around since {currentBusiness.foundedYear}</h4>
                        <img src={currentBusiness.imageURL} alt="business image" />
                        <hr />
                        <h4>Description:</h4>
                        <p>{currentBusiness.description}</p>
                        <hr />
                        {currentBusiness.openingHours && currentBusiness.openingHours.map((openingHours) => {
                            return(
                                <p key={openingHours}>{openingHours}</p>
                            )
                        })}
                    </div>
                )
                
                : (<p>No business found with this Id</p>)  
            }


            {currentReviews && !loading 
                ? (currentReviews.map((review) => {
                    return(
                        <div key={review._id}>
                            <p>{review.title}</p>
                            <p>{review.author.name}</p>
                            <hr />
                            <p>{review.text}</p>
                        </div>
                    )
                }))
                : (<p>No reviews found for this business, leave a review above!</p>)
            }

            <ReviewFormComponent/>

            {/* .................................................................................
            Implement conditional rendering to show EDIT and DELETE only if the user is logged in
            .................................................................................. */}

            <Link to={`/businesses/edit/${businessId}`}>
                <button >Edit Business</button>
            </Link>

                <button onClick={deleteBusiness}>Delete Business</button>

            <Link to={"/businesses"}>
                <button>Back to Overview</button>
            </Link>
        </>
    )
}

export default BusinessDetails;