import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'victor_shagor',
  host: 'localhost',
  database: 'api',
  password: 'oladimeji',
  port: 5432,
 })

 const Auth ={
 verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if(!token) {
    return res.status(400).send({ 'message': 'Token is not provided' });
  }
  const decoded =  jwt.verify(token, process.env.SECRET);
   pool.query('SELECT * FROM questions WHERE id = $1', [decoded.userId], (error, results) => {
    if(!results.rows) {
     return res.status(400).send({ 'message': 'The token you provided is invalid' });
   }
   req.user = { id: decoded.userId };
      next();
    
    
   })
 }
 }

 export default Auth;
