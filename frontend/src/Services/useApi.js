import axios from "axios";
import { toast } from "react-toastify";


export const api = axios.create({
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

    signup: async (user) => {
        try {
            const response = await api.post("/user/signup", {
                user,
            });

            if (response !== null && response !== "") {
                if (response.data.available) {
                    console.log("1");
                    return response.data;
                }
                if (!response.data.available) {
                    console.log("2");
                    toast.error("email already used");
                }
            }
        } catch (error) {
            toast.error("something didn't go as expected, try again!");
        }
    },

    orderPayment: async (order, token) => {
        try {
            const response = await axios.post("/order/payment", order, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            if (response !== null && response !== "") {
                return response;
            }
        } catch (error) {
            toast.error("something didn't go as expected, try again!");
        }
    },
});
