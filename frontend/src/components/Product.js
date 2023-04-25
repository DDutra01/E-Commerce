import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from "../Context/Store/StoreContext";
import axios from 'axios';


export default function Product(props) {
    const { product } = props
     const { state, dispatch: cxtDispatch } = useContext(Store);
     const {
         cart: { cartItems },
     } = state;

     const addToCartHandler = async (item) => {
         //Melhorar isso, não ficar fazendo consulta no backend toda vez.
         const isItemExist = cartItems.find((x) => x._id === product._id);
         const quantity = isItemExist ? isItemExist.quantity + 1 : 1;

         const { data } = await axios.get(`products/${item._id}`);

         if (data.countInStock < quantity) {
             window.alert("Sorry, Product is out of sotck");
             return;
         }

         cxtDispatch({
             type: "CART_ADD_ITEM",
             payload: {
                 ...item,
                 quantity,
             },
         });
     };
    
    return (
        <Card>
            <Link to={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                />
            </Link>
            <Card.Body>
                <Link
                    style={{
                        textDecorationLine: "none",
                        color: "#404040",
                        fontWeight: 600,
                    }}
                    to={`/product/${product.slug}`}
                >
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Card.Text style={{fontWeight:600}}>${product.price}</Card.Text>
                <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                />
                {product.countInStock === 0 ? (
                    <Button variant="light" disabled>
                        Out of stock
                    </Button>
                ) : (
                    <Button onClick={() => addToCartHandler(product)}>
                        Add to cart
                    </Button>
                )}
            </Card.Body>
            {/* <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                </Link>
            </div> */}
        </Card>
    );
}