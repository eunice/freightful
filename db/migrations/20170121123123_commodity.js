
exports.up = function(knex, Promise) {
    return knex.schema.createTable('commodities', function(){
        table.increments('id').primary();
        table.string('code').notNullable().unique();
        table.string('category').notNullable().unique();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('commodities');
};
