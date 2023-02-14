import React,{useContext, useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import  { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../component/CheckoutSteps';

export default function ShippingAddressScreen(){
    const navigate = useNavigate();
    const {state, dispatch:ctxDispatch } = useContext(Store);
    const {
        fullBox,
        userInfo,
        cart : {shippingAddress },
    } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address ||'');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postOffice, setPostOffice] = useState(shippingAddress.postOffice ||'');
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    },[userInfo, navigate]);
    const [country, setCountry] = useState(shippingAddress.country ||'');

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
            type : "SAVE_SHIPPING_ADDRESS",
            payload: {
                fullName,
                address,
                city,
                postOffice,
                country,
                location: shippingAddress.location,
            },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({
                fullName,
                address,
                city,
                postOffice,
                country,
                location: shippingAddress.location,
            })
        );
        navigate("/payment")
    };

    useEffect(() => {
        ctxDispatch({type:"SET_FULLBOX_OFF"});
    },[ctxDispatch,fullBox]);

    return <div>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>

        <CheckoutSteps step1 step2></CheckoutSteps>

        <div className="container small-container">
        <h1 classname="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group classname="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control value={fullName} onChange={(e) => setFullName(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group classname="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group classname="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control value={city} onChange={(e) => setCity(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group classname="mb-3" controlId="postOffice">
                <Form.Label>Post Office / PIN Code </Form.Label>
                <Form.Control value={postOffice} onChange={(e) => setPostOffice(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group classname="mb-3" controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control value={country} onChange={(e) => setCountry(e.target.value)} required></Form.Control>
            </Form.Group>

            <div className='mb-3'>
                &nbsp;
                <Button
                    id="chooseOnMap"
                    type="button"
                    variant="dark"
                    onClick={() => navigate("/map")}>
                    Choose Location On Map
                </Button>
                {shippingAddress.location && shippingAddress.location.lat 
                ? ( <div>
                        LAT:{shippingAddress.location.lat}
                        LAG:{shippingAddress.location.lng}
                    </div>
                ) : (
                    <div>No location</div>
                )}
            </div>

            <div className="mb-3 mt-3">
                <Button variant="primary" type="submit">Continue</Button>
            </div>
            
        </Form>
        </div>
    </div>;
}