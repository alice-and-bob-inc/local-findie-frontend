import axios from "axios";

class ReviewService{
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.SERVER_URL || import.meta.env.API_URL
        });

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem("authToken");

            if(storedToken){
                config.headers = { Authorization: `Bearer ${storedToken}`};
            }

            return config;
        });
    }


    getReviews = (id) => {
        return this.api.get(`/api/businesses/${id}/reviews`);
    };

    createReview = (id, requestBody) => {
        return this.api.post(`/api/businesses/${id}/reviews`, requestBody);
    };
}

const reviewService = new ReviewService();

export default reviewService;