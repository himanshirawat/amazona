import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import {Container, Form, Button} from 'react-bootstrap';
import {Helmet} from 'react-helmet-async';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading:true};
        case 'FETCH_SUCCESS':
            return {...state, loading:false};
        case 'FETCH_FAIL':
            return {...state, loading:false, error: action.payload};
        case 'UPDATE_REQUEST' :
            return {...state, loadingUpdate:true};
        case 'UPDATE_SUCCESS' :
            return {...state, loadingUpdate:false};
        case 'UPDATE_FAIL':
            return {...state, loadingUpdate:false};
        default :
            return state;
    }
};

export default function ProductEditScreen() {
    const navigate = useNavigate();
    const params = useParams();
    const { id: productId } = params;

    const {state} = useContext(Store);
    const {userInfo} = state;
    const [{loading,error,loadingUpdate},dispatch] = useReducer(reducer,{
        loading:true,
        error:'',
    });

    const [name,setName] = useState('');
    const [slug, setSlug] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch({ type:'FETCH_REQUEST'});
                const {data} = await axios.get(`/api/products/${productId}`);
                setName(data.name);
                setSlug(data.slug);
                setPrice(data.price);
                setImage(data.image);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setBrand(data.brand);
                setDescription(data.description);
                dispatch({type: 'FETCH_SUCCESS'});
            } catch (err) {
                dispatch ({
                    type:'FETCH_FAIL',
                    payload: getError(err),
                });
            }
        };
        fetchData();
    },[productId]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch ({type: 'UPDATE_REQUEST'});
            await axios.put(
                `/api/products/${productId}`,
                {
                    _id : productId,
                    name,
                    slug,
                    price,
                    image,
                    category,
                    brand,
                    countInStock,
                    description,
                },
                {
                    headers : {Authorization:`Bearer ${userInfo.token}`},
                }
            );
            dispatch ({type : 'UPDATE_SUCCESS'});
            toast.success('Product updated successfully');
            navigate('/admin/products');
        } catch (err) {
            toast.error(getError(err));
            dispatch({type : 'UPDATE_FAIL'});
        }
    };


    return (
        <Container className= "small-container">
            <Helmet>
                <title>Edit Product ${productId}</title>
            </Helmet>
            <h1>Edit Product {productId} </h1>

            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3 text-bold" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 text-bold" controlId="slug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control
                           value={slug}
                           onChange={(e) => setSlug(e.target.value)}
                           required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 text-bold" controlId="name">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                           required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 text-bold" controlId="image">
                        <Form.Label>Image File</Form.Label>
                        <Form.Control
                           value={image}
                           onChange={(e) => setImage(e.target.value)}
                           required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 text-bold" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                           value={category}
                           onChange={(e) => setCategory(e.target.value)}
                           required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 text-bold" controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                           value={brand}
                           onChange={(e) => setBrand(e.target.value)}
                           required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 text-bold" controlId="countInStock">
                    <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                           value={countInStock}
                           onChange={(e) => setCountInStock(e.target.value)}
                           required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 text-bold" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="mb-3">
                        <Button disabled={loadingUpdate} type="submit">Update</Button>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                    </div>
                </Form>
            )}
        </Container>
    );
}