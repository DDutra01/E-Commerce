import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartScreen from "../screens/Cart/CartScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import ProductScreen from "../screens/Product/ProductScreen";
import SigninScreen from "../screens/Signin/SigninScreen";
import ShippingAddressScreen from "../screens/Cart/ShippingAddressScreen";
import SignUpScreen from "../screens/Signin/SignUpScreen";
import PaymentMethodScreen from "../screens/PaymentMethod/PaymentMethodScreen";
import PlaceOrderScreen from "../screens/PlaceOrder/PlaceOrderScreen";
import OrderStatusScreen from "../screens/PlaceOrder/OrderStatusScreen";
import OrderHistorryScreen from "../screens/PlaceOrder/OrderHistorryScreen";
import ProfileScreen from "../screens/User/Profile";
import SearchPage from "../screens/Search/SearchPage";
import ProtectedRoute from "../components/ProtecteRoute";
import Dashboard from "../screens/Dashboard/Dashboard";
import AdminRoute from "../components/AdminRoute/AdminRoute";

const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/product/:slug" element={<ProductScreen />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/cartShop" element={<CartScreen />} />
                <Route path="/signin" element={<SigninScreen />} />
                <Route path="/signup" element={<SignUpScreen />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfileScreen />
                        </ProtectedRoute>
                    }
                />
                <Route path="/payment" element={<PaymentMethodScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route
                    path="/order/:id"
                    element={
                        <ProtectedRoute>
                            <OrderStatusScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/dashbaord"
                    element={
                        <AdminRoute>
                            <Dashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/orderHistory"
                    element={
                        <ProtectedRoute>
                            <OrderHistorryScreen />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/shippingAddress"
                    element={<ShippingAddressScreen />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRoutes;
