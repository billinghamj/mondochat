import express from 'express';
import * as middleware from './middleware';
import handlers from './handlers';
import exphbs from 'express-handlebars';

const app = express();
export default app;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(middleware.body);
app.use('/', handlers);
app.use(middleware.notFound);
app.use(middleware.error);
