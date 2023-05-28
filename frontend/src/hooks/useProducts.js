import { api } from "../../src/Services/useApi";
import { toast } from "react-toastify";

export const useProduct = () =>( {
    getAllProducts: async () => {
        try {
            const response = await api.get("/products/products");
            console.log(response)
            if (response.data.success) {
                const { data } = response.data;
                return data;
            }
        } catch (error) {
            return { type:'AllProducts',
                message: 'error categories',
                erro :error}
        }
    },
    getSearch: async (page, query, category, price, rating, order) => {
        console.log(query,page,category,price,rating)
        try {
            const response = await api.get(
                `/search/find?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
            );             
           
            if (response.data) {
                const { data } = response;
                console.log(data);
                return data;
            }
            
        } catch (error) {
            return {
                type: "Search",
                message: "error in search",
                erro: error,
            };
        }
    },
    getAllCategories: async () => {
        try {
            const response = await api.get("/categories/");           
            if (response.data.success) {
                const { data } = response.data;
                return data;
            }
        } catch (error) {
            return {
                type:'AllCategories',
                message: 'error categories',
                erro :error
            }
            
        }
    }
}
)