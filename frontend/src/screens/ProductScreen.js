import axios from "axios";
import { useContext, useEffect , useReducer, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {Row, Col, Form, ListGroup, Card, Badge, Button, FloatingLabel, Container,} from "react-bootstrap";
import Rating from "../component/Rating";
import {Helmet} from 'react-helmet-async';
import MessageBox from "../component/MessageBox";
import LoadingBox from "../component/LoadingBox";
import { getError } from "../utils";
import { Store } from "../Store";
import { toast } from "react-toastify";

const reducer=(state,action)=>{
    switch(action.type){
      case 'REFRESH_PRODUCT' :
        return {...state, product:action.payload};
      case 'CREATE_REQUEST':
        return {...state, loadingCreateReview: true};
      case 'CREATE_SUCCESS':
        return {...state, loadingCreateReview:false };
      case 'CREATE_FAIL':
        return {...state, loadingCreateReview: false};
      case 'FETCH_REQUEST' :
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
  let reviewsRef = useRef();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState('');

  const navigate = useNavigate();
  const params = useParams();
  const {slug} = params;

    const [{loading,error,product,loadingCreateReview},dispatch] = useReducer(reducer,{
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
            dispatch({type:'FETCH_FAILED',payload: getError(err)});
          }
        };
        fetchData();
    },[slug]);

    const { state, dispatch: ctxDispatch} = useContext(Store);
    const {cart, userInfo} = state;
    const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
      ctxDispatch({
        type:'CART_ADD_ITEM',
        payload: {...product,quantity},
      });
      navigate('/cart');
    };

    const submitHandler = async (e) => {
      e.preventDefault();
      if(!comment || !rating ) {
        toast.error('Please Enter Comment and Rating');
        return;
      }
      try {
        const {data} = await axios.post(
          `/api/products/${product._id}/reviews`,
          { rating,comment,name: userInfo.name },
          {
            headers:{Authorization:`Bearer ${userInfo.token}`},
          }
        );

        dispatch({type: 'CREATE_SUCCESS'});
        toast.success('Review submitted successfully');
        product.reviews.unshift(data.review);
        product.numReviews = data.numReviews;
        product.rating = data.rating;
        dispatch({type:'REFRESH_PRODUCT',payload:product });
        window.scrollTo({
          behavior: 'smooth',
          top: reviewsRef.current.offsetTop,
        });
      } catch (error) {
        toast.error(getError(error));
        dispatch({type:'CREATE_FAIL'});
      }
    };
    
    return <Container>
    {loading ? (
      <LoadingBox />
      ) : error ? (
        <MessageBox varient="danger">{error}</MessageBox>
      )  : ( 
        <div className="mt-3">
          <Row>
            <Col md ={6}><img className = "img-large" src={selectedImage || product.image} alt={product.name}></img></Col>
            <Col md ={3}>
              <ListGroup variant="flush">
                
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1></ListGroup.Item>
                
                <ListGroup.Item>
                  <Rating rating = {product.rating} numReviews={product.numReviews}></Rating> 
                </ListGroup.Item>

                <ListGroup.Item>Price: Rs.{product.price}</ListGroup.Item>
                
                <ListGroup.Item>
                  <Row xs={1} md={2} className="g-2">
                    {[product.image, ...product.images].map((x) => (
                      <Col key={x}>
                        <Card>
                          <Button
                            className="thumbnail"
                            type="button"
                            variant="light"
                            onClick={() => setSelectedImage(x)}>
                              <Card.Img src={x} alt="product"></Card.Img>
                            </Button>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>Description:<p>{product.Description}</p></ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md ={3}>
              <Card>
                <Card.Body>
                <ListGroup variant="flush">
                
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>Rs.{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                </ListGroup>
                <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>{product.countInStock>0 ?<Badge bg="success">In Stock</Badge> : <Badge bg="danger">Out of Stock</Badge> }</Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant = "primary">Add to Cart</Button>
                    </div>
                  </ListGroup.Item>
                )}
 
                </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="my-5">
            <h2 ref={reviewsRef}>Reviews</h2>
            <div className="mb-3">
              {product.reviews.length === 0 && (
                <MessageBox>There is no reviews</MessageBox>
              )}
            </div>
            <ListGroup>
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id} style={{width:'400px', backgroundColor: 'beige'}}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0,10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="my-3">
              {userInfo ? (
                <form onSubmit={submitHandler}>
                  <h2>Write a Customer Review</h2>
                  <Form.Group className="mb-3" controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Select 
                      aria-label="Rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}>
                        <option value="">Select...</option>
                        <option value="1">1-Poor</option>
                        <option value="2">2-Fair</option>
                        <option value="3">3-Good</option>
                        <option value="4">4-Very Good</option>
                        <option value="5">5-Excelent</option>
                      </Form.Select>
                  </Form.Group>
                  <FloatingLabel 
                    controlId="floatingTextarea"
                    label="Comments"
                    className="mb-3">
                      <Form.Control 
                        as="textarea"
                        placeholder="Leave a comment here"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}></Form.Control>
                    </FloatingLabel>

                    <div className="mb-3">
                      <Button disabled={loadingCreateReview} type="submit">
                        Submit
                      </Button>
                      {loadingCreateReview && <LoadingBox></LoadingBox>}
                    </div>
                </form>
              ) : (
                <MessageBox>
                  Please {''}
                  <Link to={`/signin?redirect=/product/${product.slug}`}>
                    Sign In
                  </Link>{' '}
                  to write a review
                </MessageBox>
              )}
            </div>
          </div>
          </div>
        )}
        </Container>
}

export default ProductScreen;