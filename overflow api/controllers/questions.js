import db from '../db';

const Questions = {
 getAllQuestions(req, res){
   return res.send({
     "question": db
})
},

getSingleQuestion(req, res) {
  
 const question = db.find(sagoro => sagoro.id === parseInt(req.params.id));
 return res.send({
   "question": question
 })
 
},
postQuestion(req, res){
  const data = {
    id: db.length + 1,
    question: req.body.question,
    answers: [req.body.answers],
  };

 db.push(data)
return res.send({
  "question": data
})
},

postAnswer(req, res){
  const question = db.find(sagoro => sagoro.id === parseInt(req.params.id));
 question.answers.push(req.body.answers)
 return res.send({ 
   "question": question
 })
 }
}


export default Questions