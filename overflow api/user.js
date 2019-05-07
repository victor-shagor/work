import Helper from './controllers/helper';

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'victor_shagor',
  host: 'localhost',
  database: 'api',
  password: 'oladimeji',
  port: 5432,
})
const User = {
create (req, res) {
 if (!req.body.email || !req.body.password) {
  return res.status(400).send({'message': 'Some values are missing'});
}
if (!Helper.isValidEmail(req.body.email)) {
  return res.status(400).send({ 'message': 'Please enter a valid email address' });
}
const hashPassword = Helper.hashPassword(req.body.password);
const email  = req.body.email
const created = new Date()
const modified = new Date()

pool.query('INSERT INTO users (email, password, created_date, modified_date) VALUES ($1, $2, $3, $4)', [email, hashPassword, created, modified], (error, results) => {
 if (error) {
   throw error
 }
 res.status(201).send(`user added with ID: ${results.insertId}`)
})
},


login(req, res){
 if (!req.body.email || !req.body.password) {
  return res.status(400).send({'message': 'Some values are missing'});
}
if (!Helper.isValidEmail(req.body.email)) {
  return res.status(400).send({ 'message': 'Please enter a valid email address' });
}
 const email = req.body.email
  pool.query('SELECT * FROM users WHERE email = $1 ',[email], (error, results) => {
    if(!results.rows){
     return res.status(400).send({'message': 'The credentials you provided is incorrect'});
   }
   if(!Helper.comparePassword(results.rows[0].password, req.body.password)) {
    return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
   }
   const id = results.rows[0].id
   
  const token = Helper.generateToken(id);
  
      return res.status(200).send({token });
    // } catch(error) {
    //   return res.status(400).send(error)
    // }
   
   })
 },


 deleteUser(req, res){
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM questions WHERE id = $1', [id], (error, results) => {
    if (!results) {
     return res.status(404).send({'message': 'user not found'});
    }
    return res.status(204).send({ 'message': 'deleted' });
    // } catch(error) {
    //   return res.status(400).send(error);
    // }
  })
}
 }

export default User;