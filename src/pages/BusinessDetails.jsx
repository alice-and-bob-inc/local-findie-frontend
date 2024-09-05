import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import businessService from "../services/business.services";
import reviewService from "../services/review.service";

function BusinessDetails () {
    const [ currentBusiness, setCurrentBusiness ] = useState(null);
    const [ currentReviews, setCurrentReviews ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const { businessId } = useParams();

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
    };


    return (
        <>

            {loading && <p>Loading...</p>}
            {error && <p>Error fetching business from database...</p>}

            <hr />
            {currentBusiness
                ? (
                    <div key={currentBusiness._id}>
                        <h3>{currentBusiness.name}</h3>
                        <h4>A {currentBusiness.category} in {currentBusiness.location} that's been around since {currentBusiness.foundedYear}</h4>
                        <img src={currentBusiness.imageURL} alt="business image" />
                        <h4>Description:</h4>
                        <p>{currentBusiness.description}</p>
                        <hr />
                        {currentBusiness.openingHours && Object.entries(currentBusiness.openingHours).map(([day, hours]) => {
                            return (
                                <p key={day}>{day}: {hours}</p>
                            );
                        })}
                    </div>
                )
                
                : (<p>No business found with this Id</p>)  
            }


            {currentReviews && currentReviews.length > 0 
                ? (currentReviews.map((review) => {
                    return(
                        
                        <div key={review._id}>
                            <p>{review.title}</p>
                            <p>Written by:{review.author.name}</p>
                            <p>{review.text}</p>
                            <hr />
                        </div>
                    )
                }))
                : (<p>No reviews found for this business, leave a review above!</p>)
            }

            <ReviewForm getSpecificBusinessReviews={getSpecificBusinessReviews}/>

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