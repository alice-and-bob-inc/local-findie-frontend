import axios from "axios";

class AuthService {
    constructor(){
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

    login = (requestBody) => {
        return this.api.post("/auth/login", requestBody);
    }

    signup = (requestBody) => {
        return this.api.post("/auth/signup", requestBody);
    }

    verify = () => {
        return this.api.get("/auth/verify");
    };

    updateUser = (userId, requestBody) => {
        return this.api.put(`/auth/user/${userId}`, requestBody)
    }

    getUserInfo = (userId) => {
        return this.api.get(`/auth/user/${userId}`)
    }
}

const authService = new AuthService();

export default authService;