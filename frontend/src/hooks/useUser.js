import { api } from "../../src/Services/useApi";
import { toast } from "react-toastify";

export const useUser = () => ({
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

    update: async (token,user) => {
        console.log('Enviei a api:',user)
        try {
            const response = await api.put(
                "/user/update",user,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
                
            );
            console.log(response)
            if (response.data.success) {
                return response.data;
            }            
        } catch (error) {
           return error
        }
    },
});
