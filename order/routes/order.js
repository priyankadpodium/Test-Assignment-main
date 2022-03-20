let router = require('express').Router();
let orderHandler = require('../handler');

// Create an order
router.route('/')
    .post(orderHandler.new);

// Check order status of an order
router.route('/:id')
    .get(orderHandler.viewOne);
    
// Cancel an order
router.route('/cancel/:id')
    .put(orderHandler.cancel);

// Export API routes
module.exports = router;