import { BrowserRouter as Router, Routes,Route,Link,} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import {Navbar,Container, Nav, Badge} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import { Store } from "./Store";
import { useContext } from "react";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <Router>
    <div className='d-flex flex-column site-container'>
      <header> 
        <Navbar bg="dark" variant="dark">
          <Container >
            <LinkContainer to = "/"><Navbar.Brand>amazona</Navbar.Brand></LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-link">
                Cart
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a,c)=> a+c.quantity,0)}
                  </Badge>
                )}
              </Link>
            </Nav>
          </Container>
        </Navbar>

      </header>
      <main>
        <Container className="mt-3">
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/signin" element={<SigninScreen />} />
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