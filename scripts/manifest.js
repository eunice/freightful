const XLSX = require('xlsx');
const ShippingOrder = require('../api/shipping_orders/model');
var workbook = XLSX.readFile('./manifest-2016dec.xlsx');
var sheetName = workbook.SheetNames[0];
var worksheet = workbook.Sheets[sheetName];
var data = to_json(workbook)[sheetName];

data.forEach(function(r) {
    var shippingOrder = ShippingOrder
    .forge({
        freight_kind: r.FREIGHT_KIND,
        weight: r.WEIGHT,
        container: r.CONTAINER,
        category: r.CATEGORY,
        destination: r.DEST,
        agent_name: r.AGENT_NAME,
        time_in: r.TIME_IN ? new Date(Date.parse(r.TIME_IN)) : null,
        time_out: r.TIME_OUT ? new Date(Date.parse(r.TIME_OUT)) : null,
        gate_out: r.GATE_OUT ? new Date(Date.parse(r.GATE_OUT)) : null
    })
    .save().then(function(order) {
        console.log("Created shipping order:", order);
    });

});

function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if(roa.length > 0){
            result[sheetName] = roa;
        }
    });
    return result;
}
