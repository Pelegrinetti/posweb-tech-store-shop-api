const Router = require('koa-router');
const productController = require('./controllers/product');
const orderController = require('./controllers/order');
const tagController = require('./controllers/tag');

const router = new Router();

router.get('/liveness', (ctx) => {
  ctx.body = 'OK';
});
router.post('/products', productController.create);
router.get('/products', productController.findAll);
router.get('/products/:sku', productController.findBySku);
router.get('/products/tag/:tag', productController.findByTag);
router.put('/products/:sku', productController.update);
router.delete('/products/:sku', productController.destroy);

router.post('/orders', orderController.create);
router.get('/orders/:id', orderController.listByUserId);

router.get('/tags', tagController.findUniqueTags);

module.exports = router;
