require('dotenv/config');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const routes = require('./routes');

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(routes.routes());

const run = () => {
  app.listen(process.env.PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`> Ready! Running at http://localhost:${process.env.PORT}.`);
  });
};

module.exports = {
  run,
};
