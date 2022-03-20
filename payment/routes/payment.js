let router = require('express').Router();
var handler = require('../handler');

router.route('/')
    .post(handler.process)
    
// Export API routes
module.exports = router;