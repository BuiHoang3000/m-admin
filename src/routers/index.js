import loginRouter from './login.js';
import signupRouter from './signup.js';
import categoryRouter from './category.js';

function route(app) {
  app.use('/api/login', loginRouter);
  app.use('/api/signup', signupRouter);
  app.use('/api/category', categoryRouter);
}

export default route;
