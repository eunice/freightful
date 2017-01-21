const bookshelf = require('../../db').bookshelf;

var Company = bookshelf.Model.extend({
    tableName: 'companies',
    hasTimestamps: ['created_at' ,'updated_at']
});

module.exports = Company;
