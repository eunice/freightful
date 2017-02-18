const router = require('koa-router')();
const ShippingOrder = require('./model');
const config = require('../../config');

router.get('/', function *(next) {
    var shippingOrders = yield ShippingOrder.collection().fetch();
    this.body = { shippingOrders: shippingOrders };
});

router.post('/create', function *(next) {
    var body = this.request.body;
    var shippingOrder = ShippingOrder
        .forge({
            freight_kind: body.freight_kind,
            weight: body.weight,
            container: body.container,
            category: body.container,
            destination: body.destination,
            agent_name: body.agent_name,
            time_in: body.time_in,
            time_out: body.time_out,
            gate_out: body.gate_out
        })
        .save();

    if (yield shippingOrder) {
        this.body = { shippingOrder: shippingOrder };
    } else {
        this.throw(422);
    }
});

function parseDate(str) {
    return null;
}

module.exports = router;
