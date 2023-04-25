import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import SigninScreen from "../screens/SigninScreen";

const  MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen/>} />
                <Route path="/product/:slug" element={<ProductScreen/>} />
                <Route path="/cartShop" element={<CartScreen/>} />
                <Route path="/signin" element={<SigninScreen/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainRoutes;