var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    unit_price: {
        type: Number,
        default: 50.00
    },
    quantity: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        default: 0.00
    },
    amount_paid: {
        type: Number,
        default: 0.00
    },
    order_status: {
        type: String,
        required: true,
        default: "created"
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Export Orders model
var Order = module.exports = mongoose.model('order', orderSchema);
module.exports.get = function (callback, limit) {
    Order.find(callback).limit(limit);
}