const bookshelf = require('../../db').bookshelf;

var Consignee = bookshelf.Model.extend({
    tableName: 'consignees',
    hasTimestamps: ['created_at' ,'updated_at']
});

module.exports = Consignee;
