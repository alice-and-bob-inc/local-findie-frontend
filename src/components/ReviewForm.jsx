import { useContext, useState } from "react";
import reviewService from "../services/review.service";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function ReviewForm({ getSpecificBusinessReviews }) {
    const [ title, setTitle ] = useState("");
    const [ text, setText ] = useState("");
    const [ rating, setRating ] = useState("");
    const { businessId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = {title, text, rating, author: user._id, business: businessId};
        console.log(requestBody)

        reviewService.createReview(businessId, requestBody)
            .then((response) => {navigate(`/businesses/${businessId}`)})
            .catch((error) => {console.log(error)});
        
        getSpecificBusinessReviews();
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                {/* title text rating author business */}
                <label>
                    Title
                        <input 
                            type="text"
                            name="title"
                            placeholder="Bloody brilliant!"
                            value={title}
                            onChange={(e) => {setTitle(e.target.value)}}
                            required
                        />
                </label>

                <label>
                    Review
                        <input 
                            type="text"
                            name="text"
                            placeholder="Leave your review here."
                            value={text}
                            onChange={(e) => {setText(e.target.value)}}
                            required
                        />
                </label>

                <label>
                    Rating
                    <select 
                        name="rating" 
                        value={rating}
                        onChange={(e) => {setRating(e.target.value)}}
                        required
                    >
                        <option value="" disabled>
                            Select a rating
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>

                <button type="submit">Submit rating</button>
                <hr />

            </form>
        </>
    )
}

export default ReviewForm;