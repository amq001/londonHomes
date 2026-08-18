import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import { authMiddleware } from './middleware/authMiddleware.js';
import tanentRoutes from './routes/tenantRoutes.js';
import managerRoutes from './routes/managerRoutes.js';

// Route Imports


// Configurations
dotenv.config(); // load environment variables from .env into process.env
const app = express();
app.use(express.json()); // parse incoming requests with JSON payloads
app.use(helmet()); // set security-related HTTP headers
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"})); // allow cross-origin resource loading (e.g. images served to other origins)
app.use(morgan("common")); // log HTTP requests in the "common" format
app.use(bodyparser.json()); // parse JSON request bodies (redundant with express.json above)
app.use(bodyparser.urlencoded({ extended: false })); // parse URL-encoded form data
app.use(cors()); // enable Cross-Origin Resource Sharing for all routes


// Routes
app.get('/', (req, res) => {
    res.send('Hello Worlddddddddd!');
});

app.use('/tenants',authMiddleware(["tenant"]) ,tanentRoutes);
app.use('/managers',authMiddleware(["manager"]) , managerRoutes);

// Server
const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});