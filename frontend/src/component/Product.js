import axios from "axios";
import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import Rating from "./Rating";
import "../style/HomeScreen.css";
import "../style/product.css";

function Product(props){
    const {product} = props;
    const {state,dispatch:ctxDispatch } = useContext(Store);
    const {
        cart: {cartItems},
    } = state;

    const addtoCartHandler = async (item)=>{
        const existItem = cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
          }
        ctxDispatch({
            type:'CART_ADD_ITEM',
            payload: {...item,quantity},
        });
    };
    return (
        <Card className="productCard">
            <Link to={`/product/${product.slug}`}>
                <img src = {product.image} className="card-img-top" alt={product.name }></img>
            </Link>
            <Card.Body>
                <Link to={`/product/${product.slug}`}>
                    <Card.Title className="productname">{product.name}</Card.Title>
                </Link>
                <Rating rating = {product.rating} numReviews={product.numReviews}></Rating>
                <Card.Text><strong>Rs.{product.price}</strong></Card.Text>
                {product.countInStock === 0  ? (
                     <Button variant="light" disabled>
                        Out of Stock
                    </Button>
                ): (<Button className="bg-success" onClick={()=> addtoCartHandler(product)}>Add to cart</Button>
                )}
            </Card.Body>
        </Card>
    );
}

export default Product;