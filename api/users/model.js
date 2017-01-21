const bookshelf = require('../../db').bookshelf;
const bcrypt = require('bcrypt');
const checkit = require('checkit');

var User = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: ['created_at', 'updated_at'],
  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave);
  },
  validateSave: function() {
    return new checkit({
      email: 'required'
    }).run(this.attributes);
  },
  signup: function() {
  }
});

module.exports = User;

