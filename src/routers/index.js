import categoryRouter from './category.js';

function route(app) {
  app.use('/api/category', categoryRouter);
}

export default route;
