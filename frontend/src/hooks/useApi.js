import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4001",
});
export const useApi = () => ({

    signin: async (email, password) => {           
            try {
                const response = await api.post("/user/signin", { email, password });
                return response.data;
            } catch (error) {
                console.error("chegou do back na api", error);
            }
        },
})