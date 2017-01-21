
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cosignees', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.timestamps();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('consignees');
};
