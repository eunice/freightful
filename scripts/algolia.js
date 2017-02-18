var algoliasearch = require('algoliasearch');
var client = algoliasearch('251VRS1CZY', '0631362f66f0e0d44d27da63616c4df4');
var index = client.initIndex('shipping_orders');
var ShippingOrder = require('../api/shipping_orders/model');
  
ShippingOrder.fetchAll().then(function(res) {
    var objects = [];
    res.forEach(function(model) {
        objects.push(model.attributes);
    });
    index.addObjects(objects, function(err, content) {
        if (err) {
            console.error(err);
        } else {
            console.log('objectID=' + content.objectID);
        }
        
    });  
});

