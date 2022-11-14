import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import route from './src/routers/index.js';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT;

var corsOptions = {
  origin: [
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://localhost:5173',
  ],
};

app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Route init
route(app);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
