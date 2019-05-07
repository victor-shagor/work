const Pool = require('pg').Pool
const pool = new Pool({
  user: 'victor_shagor',
  host: 'localhost',
  database: 'api',
  password: 'oladimeji',
  port: 5432,
})
const getQuestions = (req, res) => {
 const owner = parseInt(req.user.id)
 console.log(owner)
  pool.query('SELECT * FROM questions WHERE owner_id = $1 ',[owner], (error, results) => {
    console.log(results.rows)
    if (error) {
      throw error
    }
    res.status(200).json({
     "question": results.rows
    })
      
     })
     
      
     }
     

const getQuestionById = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM questions WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    pool.query('SELECT * FROM answers WHERE questionid = $1', [id], (error, answers) => {
     if (error) {
       throw error
     }

     res.status(200).json({
      "questions": results,
      "answers": answers
     })
   })
  })
 
}

const postQuestion = (req, res) => {
  const question  = req.body.question
  const owner = req.user.id
  const created = new Date()
  const modified = new Date()

  pool.query('INSERT INTO questions (question, owner_id, created_date, modified_date) VALUES ($1, $2, $3, $4)', [question, owner, created, modified], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`question added with ID: ${results.insertId}`)
  })
}
const postAnswer = (req, res) => {
 const answer= req.body.answer
 const questionid = req.params.id
 

 pool.query('INSERT INTO answers (answer, questionid) VALUES ($1, $2)', [answer, questionid], (error, results) => {
   if (error) {
     throw error
   }
   res.status(201).send(`answer added with ID: ${results.insertId}`)
 })
}

const editQuestion = (req, res) => {
  const id = parseInt(req.params.id)
  const { question} = req.body

  pool.query(
    'UPDATE question SET question = $1, WHERE id = $2',
    [question, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`question modified with ID: ${id}`)
    }
  )
}

const deleteQuestion = (req, res) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM questions WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).send(`question deleted with ID: ${id}`)
  })
}

module.exports = {
  getQuestions,
  getQuestionById,
  postQuestion,
  editQuestion,
  deleteQuestion,
  postAnswer
}