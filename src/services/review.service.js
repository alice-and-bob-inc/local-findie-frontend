import axios from "axios";

class ReviewService{
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || "http://localhost:5005"
        });

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem("authToken");

            if(storedToken){
                config.headers = { Authorization: `Bearer ${storedToken}`};
            }

            return config;
        });
    }


    getAllReviews = () => {
        return this.api.get("/api/reviews");
    }

    getReviews = (id) => {
        return this.api.get(`/api/businesses/${id}/reviews`);
    };

    createReview = (id, requestBody) => {
        return this.api.post(`/api/businesses/${id}/reviews`, requestBody);
    };

    deleteReview = (businessId, reviewId) => {
        return this.api.delete(`/api/businesses/${businessId}/reviews/${reviewId}`)
    }
}

const reviewService = new ReviewService();

export default reviewService;