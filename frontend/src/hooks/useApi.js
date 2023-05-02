import axios from "axios";
import { toast } from "react-toastify";



const api = axios.create({
    baseURL: "http://localhost:4001",
});
export const useApi = () => ({
    signin: async (email, password) => {
        try {
            const response = await api.post("/user/signin", {
                email,
                password,
            });
            if (response != null && response !== "") {
                return response.data;
            }            
        } catch (error) {
           toast.error("Invalid email or password");
        }
    },
});
