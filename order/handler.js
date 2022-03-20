Order = require('./models/order');
const axios = require('axios');
const PAYMENT_APP_PORT = 5003;
const PAYMENT_URL = 'http://payment:'+PAYMENT_APP_PORT+'/payment';
const UNIT_PRICE = 50.00

// Create an order
exports.new = function (event, context) {
    let start = Date.now();
    
    try{
        let request = event.body;
        var order = new Order();
        
        order.name = request.name;
        order.unit_price = UNIT_PRICE;
        order.quantity = request.quantity;
        var total_amount = request.quantity * UNIT_PRICE;
        total_amount = total_amount.toFixed(2);
        order.total_amount = total_amount;

        // save the contact and check for errors
        order.save(function (err, order) {
            if (err) {
                context.json(err);
            } else {
                // call the error payment endpoint to process the payment
                let amount_to_pay = total_amount;
                
                // make the amount different by random to demonstrate the declined transaction
                // let randomNum = Math.floor(Math.random() * 2);
                // amount_to_pay = parseFloat(amount_to_pay) + parseFloat(randomNum);
                amount_to_pay = parseFloat(amount_to_pay).toFixed(2);
    
                axios.post(PAYMENT_URL, {
                    order_id:order._id, 
                    amount: amount_to_pay
                })
                .then(contextponse => {
                    console.log ("contextponse ");
                    console.log(contextponse.data)

                    var new_status = "confirmed";
                    if (contextponse.data.status == "declined") {
                        new_status = "canceled";
                    }

                    Order.update({_id:order._id}, {"$set":{"order_status": new_status, "amount_paid": amount_to_pay}}, (err, order_update) => {
                        if (err) {
                            context.send(err);
                        }
                        else {
                            order.amount_paid = amount_to_pay
                            order.order_status = new_status

                            context.json({
                                message: 'New order added!',
                                data: order
                            });
                        }
                    });

                })
                .catch(error => {
                    context.send(error);
                });
            }
        });
    } catch (error) {
        end = Date.now();
        console.log("Time taken by API => ", end-start, " ms");
        
    }

};

// Check order status of an order
exports.viewOne = function (event, context) {
    Order.find({_id:event.params.id},"", function (err, order) {
        if (err)
            context.send(err);
        if (order.length > 0) {
            context.json({
                message: 'Order is loading.',
                data: order
            });
        } else {
            context.json({
                message: 'No order to load',
                data: order
            });
        }
    });
};

// Cancel an order
exports.cancel = function (event, context) {
    Order.update({_id:event.params.id}, {"$set":{"order_status": "canceled"}}, (err, order) => {
        if (err)
            context.send(err);
        context.json({
            message: 'Order canceled'
        });
    });
};

exports.checkConfirmed = function (event, context) {
    var status = "No order to be updated";
    Order.updateMany({order_status:"confirmed"}, {"$set":{"order_status": "delivered"}}, (err, writecontextult) => {
        if (err) {
            status = "Error while updating order with status confirmed";
        }
        if (writecontextult.nModified > 0) {
            status = "All order ("+writecontextult.nModified +") with order_status confirmed updated to delivered.";
            console.log(status);
        } else {
            status = "No order with order_status confirmed";
            console.log(status);
        }

    });
    return status;
};
