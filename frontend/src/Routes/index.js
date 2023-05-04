import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartScreen from "../screens/Cart/CartScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProductScreen from "../screens/Product/ProductScreen";
import SigninScreen from "../screens/Signin/SigninScreen";
import ShippingAddressScreen from "../screens/Cart/ShippingAddressScreen";
import SignUpScreen from "../screens/Signin/SignUpScreen";
import PaymentMethodScreen from "../screens/PaymentMethod/PaymentMethodScreen";
import PlaceOrderScreen from "../screens/PlaceOrder/PlaceOrderScreen";

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/product/:slug" element={<ProductScreen />} />
                <Route path="/cartShop" element={<CartScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />
                <Route path="/payment" element={<PaymentMethodScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route
                    path="/shippingAddress"
                    element={<ShippingAddressScreen />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRoutes;
