import bcrypt from 'bcryptjs'

const data = {


    products: [
        {
            // _id: "1",
            name: "Nike Slim Shirt",
            slug: "nike-slim-shirt",
            category: "Shirts",
            price: 120,
            countInStock: 10,
            brand: "Nike",
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt",
            image: "./images/shirtNike.jpg", // 679px 829px
        },
        {
            name: "Nike Slim Shorts",
            slug: "nike-slim-Shorts",
            category: "Shirts",
            price: 120,
            countInStock: 10,
            brand: "Nike",
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt",
            image: "/images/shortsNike.jpg",
        },
        {
            name: "Adidas Slim Pants",
            slug: "Adidas-slim-Pants",
            category: "Shirts",
            price: 120,
            countInStock: 10,
            brand: "Nike",
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt",
            image: "/images/pantsAdidas.jpg",
        },
        {
            name: "Adidas Slim Shirt",
            slug: "Adidas-slim-Shirt",
            category: "Shirts",
            price: 120,
            countInStock: 10,
            brand: "Nike",
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt",
            image: "/images/shirtsAdidas.jpg",
        },
        {
            name: "Nike Slim pants",
            slug: "nike-slim-pants",
            category: "Shirts",
            price: 120,
            countInStock: 10,
            brand: "Nike",
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt",
            image: "/images/pantsNike.jpg",
        },
        {
            name: "NY Slim Shirt",
            slug: "ny-slim-shirt",
            category: "Shirts",
            price: 120,
            countInStock: 0,
            brand: "Nike",
            rating: 4.5,
            numReviews: 10,
            description: "high quality shirt",
            image: "/images/shirtsNy.jpg",
        },
    ],
    users: [
        {
            name: "Dutra",
            email: "admin@example.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: true,
        },
        {
            name: "John",
            email: "user@example.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: false,
        },
    ],
};

export default data;