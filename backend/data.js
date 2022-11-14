import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name: 'Atul',
            email: 'atul@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true
        },
        {
            name: 'Vikash',
            email: 'vikash@example.com',
            password: bcrypt.hashSync('876543'),
            isAdmin: false
        },
        {
            name: 'Praveen',
            email: 'praveen@example.com',
            password: bcrypt.hashSync('654321'),
            isAdmin: false
        },
        
    ],
    products : [
        {
            name: 'lemon pickle',
            slug: 'pickles-1',
            category : 'PICKLE',
            image : '/images/p1.jpg',
            price:320,
            countInStock: 20,
            brand : 'PAHADI',
            rating : 4.5,
            numReviews: 10,
            Description :'High Quality Food'
        },
        {
            name: 'mango pickle',
            slug: 'pickles-2',
            category : 'PICKLE',
            image : '/images/p2.jpg',
            price:400,
            countInStock: 0,
            brand : 'PAHADI',
            rating : 4,
            numReviews: 10,
            Description :'High Quality food'
        },
        {
            name: 'Ginger pickle',
            slug: 'pickles-3',
            category : 'PICKLE',
            image : '/images/p3.jpg',
            price:350,
            countInStock: 10,
            brand : 'PAHADI',
            rating : 3.5,
            numReviews: 10,
            Description :'High Quality pickle'
        },
        {
            name: 'Bhat Dal',
            slug: 'dal-1',
            category : 'pulses',
            image : '/images/bhat.jpeg',
            price:300,
            countInStock: 20,
            brand : 'PAHADI',
            rating : 4.5,
            numReviews: 10,
            Description :'High Quality food'
        },
        {
            name: 'Rajma dal',
            slug: 'dal-2',
            category : 'pulses',
            image : '/images/rajma.jpg',
            price:200,
            countInStock: 15,
            brand : 'PAHADI',
            rating : 4.5,
            numReviews: 10,
            Description :'High Quality food'
        },
        {
            name: 'Basket',
            slug: 'item-1',
            category : 'Goods',
            image : '/images/basket.jpeg',
            price:150,
            countInStock: 200,
            brand : 'PAHADI',
            rating : 4,
            numReviews: 10,
            Description :'High Quality product'
        },
        {
            name: 'Woolen sweater',
            slug: 'sweater-1',
            category : 'Cloths',
            image : '/images/sweater.jpeg',
            price:1100,
            countInStock: 10,
            brand : 'PAHADI',
            rating : 4,
            numReviews: 10,
            Description :'High Quality cloths'
        },
        {
            
            name: 'Pahadi Hat',
            slug: 'item-2',
            category : 'Cloths',
            image : '/images/topi.jpeg',
            price:150,
            countInStock: 10,
            brand : 'PAHADI',
            rating : 4.2,
            numReviews: 10,
            Description :'High Quality cloths'
        },
    ],

};

export default data;