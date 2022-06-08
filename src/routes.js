const Router = require('koa-router');
const productController = require('./controllers/product');
const tagController = require('./controllers/tag');

const router = new Router();

router.get('/liveness', (ctx) => {
  ctx.body = 'OK';
});
router.post('/products', productController.create);
router.get('/products', productController.findAll);
router.get('/products/:sku', productController.findBySku);

router.get('/tags', tagController.findUniqueTags);

module.exports = router;
