import { BrowserRouter as Router, Routes,Route,Link,} from "react-router-dom";
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Navbar,Container, Nav, Badge, NavDropdown, Button} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import { Store } from "./Store";
import { useContext, useEffect, useState } from "react";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SignupScreen from "./screens/SignupScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreeen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { getError } from "./utils";
import axios from "axios";
import SearchBox from "./component/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import ProtectedRoute from "./component/ProductedRoute";
import AdminRoute from "./component/AdminRoute";
import DashboardScreen from "./screens/DashboardScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import MapScreen from "./screens/MapScreen";


function App() {
  const { state,dispatch:ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({type: 'USER_SIGNOUT'});
    localStorage.removeItem('userInfo'); 
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try{
        const {data} = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch(err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  },[])

  return (
    <Router>
    <div className= {
      sidebarIsOpen 
          ?  fullBox
            ? 'site-container active-cont d-flex flex-column full-box' 
            : 'site-container active-cont d-flex flex-column '
          : fullBox
            ? 'site-container d-flex flex-column full-box' 
            : 'site-container d-flex flex-column'
          } >

      <ToastContainer position="bottom-center" limit={1} ></ToastContainer>
      <header> 
        <Navbar bg="dark" variant="dark" expand="lg" >
          <Container >
            <Button variant="dark" onClick={() => setSidebarIsOpen(!sidebarIsOpen)}>
              <i className="fas fa-bars"></i>
            </Button>
            <LinkContainer to = "/"><Navbar.Brand>ecommerce</Navbar.Brand></LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
            <Nav className="me-auto w-100 justify-content-end">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a,c)=> a+c.quantity,0)}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider></NavDropdown.Divider>
                  <Link className="dropdown-item" to="#signout" onClick={signoutHandler}>Sign Out</Link>
                </NavDropdown>
              ):(
                <Link className="nav-link" to="/signin"> Sign In </Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      </header>
      <div className= {sidebarIsOpen ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column' : 'side-navbar d-flex justify-content-between flex-wrap flex-column'}>
        <Nav className="flex-column text-white w-100 p-2">
          <Nav.Item>
            <strong>Categories</strong>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category}>
              <Link to={`/search?category=${category}`} onClick={() => setSidebarIsOpen(false)}>
                <Nav.Link>{category}</Nav.Link>
              </Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <main>
        <Container className="mt-3">
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/payment" element={<PaymentMethodScreen />} />
          <Route path="/map" elemnet={<ProtectedRoute><MapScreen /></ProtectedRoute>}></Route>
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<ProtectedRoute><OrderScreen /></ProtectedRoute>} />
          <Route path="/orderhistory" element={<ProtectedRoute><OrderHistoryScreen /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />
          <Route path="/search" element={<SearchScreen/>} />

          {/* ADMIN ROUTES  */}
          <Route path="/admin/dashboard" element={<AdminRoute><DashboardScreen /></AdminRoute>} />
          <Route path="/admin/products" element={<AdminRoute><ProductListScreen /></AdminRoute>} />
          <Route path="/admin/product/:id" element={<AdminRoute><ProductEditScreen /></AdminRoute>} />
          <Route path="/admin/orders" element={<AdminRoute><OrderListScreen /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UserListScreen /></AdminRoute>} />
          <Route path="/admin/user/:id" element={<AdminRoute><UserEditScreen /></AdminRoute>} />

          <Route path="/" element={<HomeScreen />} />
        </Routes>
        </Container>
      </main>
      <footer>
        <div className = 'text-center'>
          All right reserved
        </div>
      </footer>
    </div>
    </Router>
  );
}

export default App;