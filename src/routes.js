const Router = require('koa-router');
const productController = require('./controllers/product');

const router = new Router();

router.get('/liveness', (ctx) => {
  ctx.body = 'OK';
});
router.post('/products', productController.create);
router.get('/products', productController.findAll);
router.get('/products/:sku', productController.findBySku);

module.exports = router;
