import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";

const  MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen/>} />
                <Route path="/product/:slug" element={<ProductScreen/>} />
                <Route path="/cart" element={<CartScreen/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRoutes;