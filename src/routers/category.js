import express from 'express';
import bodyParser from 'body-parser';
//
import { get, update } from '../controllers/CategoryController.js';

const route = express.Router();

// create application/json parser
var jsonParser = bodyParser.json();

route.get('/', get);
route.put('/', jsonParser, update);

export default route;
