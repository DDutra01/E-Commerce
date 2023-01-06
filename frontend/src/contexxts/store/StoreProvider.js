import { useReducer } from "react";
import { Store } from "./StoreContext";

const initialState = {
    cart: {
        cartItems: [],
    },
};

function reducer(state, action) {
    switch (action.type) {
        case "CART_ADD_ITEM":

            const newItem = action.payload;
            //have is product in the cart ?
            const isItemExist = state.cart.cartItems.find((item) => item._id === newItem._id)
            //is true ? add +1 item, else add new Item
            const cartItems = isItemExist ? state.cart.cartItems.map((item) => item._id === isItemExist._id ? newItem : item) :
                [...state.cart.cartItems,newItem]

            return {
                ...state, cart: {
             ...state.cart,cartItems
         }}
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };

    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
