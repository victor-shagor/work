import bodyParser from 'body-parser';
import express from 'express';
import questionRouter from './routes/questions';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(questionRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('sagoro is listening on port 3000');
});

export default app;
