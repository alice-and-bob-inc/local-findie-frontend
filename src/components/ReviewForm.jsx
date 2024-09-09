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
        reviewService.createReview(businessId, requestBody)
            .then((response) => {navigate(`/businesses/${businessId}`)})
            .catch((error) => {console.log(error)});
        getSpecificBusinessReviews();
        setText("");
        setTitle("");
        setRating("");
    }

    return(
        <>
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 mt-6">
                <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input 
                        type="text" 
                        id="title"
                        value={title}
                        onChange={(e) => {setTitle(e.target.value)}}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
                        Review
                    </label>
                    <textarea 
                        id="text"
                        value={text}
                        onChange={(e) => {setText(e.target.value)}}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                        Rating
                    </label>
                    <select 
                        id="rating"
                        name="rating" 
                        value={rating}
                        onChange={(e) => {setRating(e.target.value)}}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                </div>

                <div className="flex- items-center justify-between">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="submit"
                    >
                        Submit rating
                    </button>
                </div>

            </form>
        </>
    )
}

export default ReviewForm;