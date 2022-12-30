import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import Rating from './Rating';


export default function Product(props) {
    const { product } = props
    
    return (
        <Card >
            <Link to={`/product/${product.slug}`}>
                <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                />
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Card.Text>${product.price}</Card.Text>
                <Rating rating={product.rating} numReviews={product.numReviews}/>
                <Button>Add to cart</Button>
            </Card.Body>
            {/* <div className="product-info">
                <Link to={`/product/${product.slug}`}>
                    <p>{product.name}</p>
                </Link>
            </div> */}
        </Card>
    );
}