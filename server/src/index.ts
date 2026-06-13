import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

// Route Imports


// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());



app.get('/', (req, res) => {
    res.send('Hello Worlddddddddd!');
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});