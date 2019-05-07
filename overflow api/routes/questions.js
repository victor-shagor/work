import express from 'express';
import questions from '../controllers/questions';
import db from '../queries';
import User from '../user';
import Auth from '../auth';
const questionRouter = express.Router()

const { getAllQuestions,getSingleQuestion,postQuestion,postAnswer } = questions
// const { getQuestions,getQuestionById,postQuestion, postAnswer } = db
// const {verifyToken} = Auth
// const {create, login, deleteUser} = User




questionRouter.route('/questions').get(
 // verifyToken, 
 getAllQuestions
)

// questionRouter.route('/questions/:id').get(
//  verifyToken, getQuestionById
// )

// questionRouter.route('/questions').post(
//  verifyToken, postQuestion
// )

// questionRouter.route('/questions/:id/:answers').post(
//  verifyToken, postAnswer
// )

// questionRouter.route('/users').post(
//  create
// )

// questionRouter.route('/users/login').post(
//  login
// )

// questionRouter.route('/users/:id').post(
//  verifyToken, deleteUser
// )






export default questionRouter