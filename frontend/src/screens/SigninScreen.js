import { Container, Form, Button } from "react-bootstrap";
import {useLocation, Link} from "react-router-dom";
import { Helmet } from "react-helmet-async";

export  default function SigninScreen(){
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    return (
        <Container className="small-container">
            <Helmet>
                <title>Sign In</title>
            </Helmet>
            <h1 className="my-3">Sign in</h1>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" required></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" required></Form.Control>
                </Form.Group>
                <div className="mb-3">
                    <Button type="submit">Sign in</Button>
                </div>
                <div>
                    New Customer ? {' '}
                    <Link to={`signup?redirect=${redirect}`} >Create your account</Link>
                </div>
            </Form>
        </Container>
    );
}