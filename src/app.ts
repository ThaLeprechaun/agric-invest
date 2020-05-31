import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import graphQLHTTP from 'express-graphql';
import path from 'path';

import indexRouter from './routes/index';
import authRouter from './routes/auth';
import authFarmerRouter from './routes/authFarmer';
import userRouter from './routes/user';
import farmerRouter from './routes/farmer';
import farmRouter from './routes/farms';
import investRouter from './routes/investments';
import schema from './schema';

const app = express();

// view engine setup
// app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

//Route middlewares
app.use('/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/auth-farmer', authFarmerRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/farmers', farmerRouter);
app.use('/api/v1/farms', farmRouter);
app.use('/api/v1/investments', investRouter);

app.use(
  '/graphql',
  graphQLHTTP({
    schema,
    graphiql: true,
  }),
);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: Error,
  req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status((<any>err).status || 500);
  res.render('error');
});

export default app;
