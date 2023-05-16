import { api } from "../../src/Services/useApi";
import { toast } from "react-toastify";

export const useOrder = () => ({
    orderPayment: async (order, token) => {
        try {
            const response = await api.post("/order/payment", order, {
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

    getOrder: async (id, token) => {
        try {
            const response = await api.get(`/order/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            if (response !== "" && response !== null) {
                return response;
            }
        } catch (error) {
            toast.error("something didn't go as expected, try again!");
            return error;
        }
    },

    paypal: async (token) => {
        try {
            const response = await api.get(`/payment/paypal`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            if (response !== "" && response !== null) {
                return response;
            }
        } catch (error) {
            toast.error("something didn't go as expected, try again!");
            return error;
        }
    },
    paypalRequest: async (id,token,details) => {
        try {
            const response = await api.get(`/payment/${id}/pay`,details, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            if (response !== "" && response !== null) {
                return response;
            }
        } catch (error) {
            toast.error("something didn't go as expected, try again!");
            return error;
        }
    },
});
