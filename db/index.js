'use strict';
var pg = require('pg');
var config = require('./config');

// Check for dev
var knex = require('knex')({
      client: 'pg',
      connection: {
              database : 'freightful_dev',
              charset  : 'utf8'
            }
});

var bookshelf = require('bookshelf')(knex);

/**
 *  * Perform an "Upsert" using the "INSERT ... ON CONFLICT ... " syntax in PostgreSQL 9.5
 *   * @link http://www.postgresql.org/docs/9.5/static/sql-insert.html
 *    * https://gist.github.com/plurch/118721c2216f77640232
 *     **/
 
var upsertItem = function(tableName, conflictTarget, itemData) {
       let exclusions = Object.keys(itemData)
           .filter(c => c !== conflictTarget)
           .map(c => bookshelf.knex.raw('?? = EXCLUDED.??', [c, c]).toString())
           .join(",\n");

       let insertString = bookshelf.knex(tableName).insert(itemData).toString();
       let conflictString = bookshelf.knex.raw(` ON CONFLICT (??) DO UPDATE SET ${exclusions} RETURNING *;`, conflictTarget).toString();
       let query = (insertString + conflictString).replace(/\?/g, '\\?');

       return bookshelf.knex.raw(query)
           .on('query', data => console.log('Knex: ' + data.sql))
           .then(result => result.rows[0]);
     };

module.exports = {
      bookshelf: bookshelf,
      upsertItem: upsertItem
}
