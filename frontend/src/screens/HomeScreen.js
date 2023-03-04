import {useEffect , useReducer } from "react";
import axios from "axios";
import {Row, Col} from "react-bootstrap";
import Product from "../component/Product";
import {Helmet} from 'react-helmet-async';
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import {CgMouse} from "react-icons/cg";
import "../style/HomeScreen.css";


//reducer function
const reducer=(state,action)=>{
  switch(action.type){
    case'FETCH_REQUEST' :
      return {...state, loading : true}; // to show loading box in UIfalse
    case 'FETCH_SUCCESS' :
      return{...state, products:action.payload, loading:false}; //action.payload contains product from backend
    case 'FETCH_FAILED' :
      return{...state, loading : false, error : action.payload };
    default:
      return state;

  }
};

function HomeScreen(){
  const [{loading,error,products},dispatch] = useReducer(reducer,{
    products :[],
    loading :true,
    error :"",
  });
  useEffect(()=>{
    const fetchData = async () => {
      dispatch({type: 'FETCH_REQUEST'})
      try {
        const result = await axios.get('/https://amazona-clone.onrender.com/products');
        dispatch({type:'FETCH_SUCCESS',payload: result.data});
      } catch (err) {
        dispatch({type:'FETCH_FAILED',payload: err.message});
      }
      
      // setProducts(result.data);
    };
    fetchData();
  },[]);

    return ( 
    <>
    <div className="banner">
      <p>Welcome to Ecommerce</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#products"><button>Scroll<CgMouse /></button></a>
    </div>
    <div>
      <Helmet>
        <title>Online Store</title>
      </Helmet>
        <h2 className="homeheading">Featured Products</h2>
        <div className="products" id="products">
        {
          loading ? (
          <LoadingBox />
          ) : error ? (
            <MessageBox varient="danger">{error}</MessageBox>
          ) : (
            <Row>
              {products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product> {/* code for this section is in product.js file */}
                </Col>
              ))}
            </Row>
        )}
        </div>
    </div>;
</>
);};
export default HomeScreen;