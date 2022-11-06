import axios from "axios";
import { useEffect , useReducer } from "react";
import { useParams } from "react-router-dom";
import {Row, Col, ListGroup, ListGroupItem, Card, Badge, Button} from "react-bootstrap";
import Rating from "../component/Rating";
import {Helmet} from 'react-helmet-async';

const reducer=(state,action)=>{
    switch(action.type){
      case'FETCH_REQUEST' :
        return {...state, loading : true} // to show loading box in UIfalse
      case 'FETCH_SUCCESS' :
        return{...state, product : action.payload, loading:false}; //action.payload contains product from backend
      case 'FETCH_FAILED' :
        return{...state, loading : false, error : action.payload };
      default:
        return state;
  
    }
};

function ProductScreen(){
    const params = useParams();
    const {slug} = params;

    const [{loading,error,product},dispatch] = useReducer(reducer,{
        product :[],
        loading :true,
        error :'',
      });
      useEffect(()=>{
        const fetchData = async () => {
          dispatch({type: 'FETCH_REQUEST'})
          try {
            const result = await axios.get(`/api/products/slug/${slug}`);
            dispatch({type:'FETCH_SUCCESS',payload: result.data});
          } catch (err) {
            dispatch({type:'FETCH_FAILED',payload: err.message});
          }
        };
        fetchData();
    },[slug]);


    return loading ? (
        <div>Loading...</div> 
    ) : error ? (
        <div>{error}</div> 
    ) : ( 
        <div>
          <Row>
            <Col md ={6}><img className = "img-large" src={product.image} alt={product.name}></img></Col>
            <Col md ={3}>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1></ListGroupItem>
                <ListGroupItem>
                  <Rating>
                    rating={product.rating}
                    numReviews ={product.numReviews}
                  </Rating>
                  
                </ListGroupItem>
                <ListGroupItem>Price: Rs.{product.price}</ListGroupItem>
                <ListGroupItem>Description:<p>{product.Description}</p></ListGroupItem>
              </ListGroup>
            </Col>
            <Col md ={3}>
              <Card>
                <Card.Body>
                <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price :</Col>
                    <Col>Rs.{product.price}</Col>
                  </Row>
                </ListGroupItem>
                </ListGroup>
                <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Status :</Col>
                    <Col>{product.countInStock>0 ?<Badge bg="success">In Stock</Badge> : <Badge bg="danger">Out of Stock</Badge> }</Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button variant = "primary">Add to Cart</Button>
                    </div>
                  </ListGroupItem>
                )}

                </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
    );
}

export default ProductScreen;