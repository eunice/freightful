
exports.up = function(knex, Promise) {
    return knex.schema.createTabe('shipping_orders', function(table) {
        table.increments('id').primary();
        table.string('freight_kind');
        table.string('commodity_id');
        table.string('weight');
        table.string('container');
        table.string('category');
        table.integer('consignee_id');
        table.string('destination');
        table.string('agent_name');
        table.float('weight');
        table.integer('shipper_id');
        table.dateTime('time_in');
        table.dateTime('time_out');
        table.dateTime('gate_out');
        table.timestamps();
    }); 
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('shipping_orders');
};
