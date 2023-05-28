import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../../Context/Store/StoreContext";

export default function AdminRoute({ children }) {
    const { state } = useContext(Store);
    const { userInfo } = state;
    return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}