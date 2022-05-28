const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const BooksRouter = require('./api/books/books.route');
const DrinksRouter = require('./api/drinks/drinks.route');

const app = express();

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "LivreCoffee API",
            version: "1.0.0",
            description: "LivreCoffee API swagger documentation"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [`${__dirname}/api/*/*.route.js`]
}

const specs = swaggerJsDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/books', BooksRouter);
app.use('/drinks', DrinksRouter);

module.exports = app;