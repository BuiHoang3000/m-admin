import express from 'express';
import bodyParser from 'body-parser';
//
import { login } from '../controllers/LoginController.js';

const route = express.Router();

// create application/json parser
var jsonParser = bodyParser.json();

route.get('/', login);

export default route;
