
import axios from 'axios';

class BusinessService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.SERVER_URL || import.meta.env.API_URL
        });

        this.api.interceptors.request.use(config => {
            const storedToken = localStorage.getItem("authToken");

            if(storedToken){
                config.headers = {Authorization: `Bearer ${storedToken}`};
            }

            return config;
        });
    }

    createBusiness = (requestBody) => {
        return this.api.post("/api/businesses", requestBody);
    };

    getAllBusinesses = () => {
        return this.api.get("/api/businesses");
    };

    getBusiness = (id) => {
        return this.api.get(`/api/businesses/${id}`);
    };

    updateBusiness = (id, requestBody) => {
        return this.api.put(`/api/businesses/${id}`, requestBody);
    };

    deleteBusiness = (id) => {
        return this.api.delete(`/api/businesses/${id}`);
    };
}

const businessService = new BusinessService;

export default businessService;