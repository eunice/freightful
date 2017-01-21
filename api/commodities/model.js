const bookshelf = require('../../db').bookshelf;

var Commodities = bookshelf.Model.extend({
    tableName: 'commodities',
    hasTimestamps: ['created_at' ,'updated_at']
});

module.exports = Company;
