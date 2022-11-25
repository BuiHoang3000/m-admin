import express from 'express';
import bodyParser from 'body-parser';
//
import {
  checkDuplicateNickname,
  checkDuplicateEmail,
  signup,
} from '../controllers/SignUpController.js';

const route = express.Router();

// create application/json parser
var jsonParser = bodyParser.json();

route.post('/', jsonParser, signup);
route.post('/check-duplicate-nickname', jsonParser, checkDuplicateNickname);
route.post('/check-duplicate-email', jsonParser, checkDuplicateEmail);

export default route;
