const bookshelf = require('../../db').bookshelf;

var ShippingOrder = bookshelf.Model.extend({
    tableName: 'shipping_orders',
    hasTimestamps: ['created_at' ,'updated_at']
});

module.exports = ShippingOrder;
