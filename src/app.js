import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import cors from 'cors';
import connectDatabase from './database/db.js';

import index from './routes/index.js';
// import users from './routes/users';


connectDatabase()

const app = express();
dotenv.config({ path: '.env' });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors());

app.use('/', index);
// app.use('/users', users);   


app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT}`);
})