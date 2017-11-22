var pg = require('pg');

var config = {
    database: 'TODO', //name of database
    host: 'localhost', //where is your database(what computer)
    port: 5432, //port number for database (5432 is default)
    max: 10, //how many connections at one time
    idleTimeoutMillies: 30000 //30 sec to try to connect to database
  };

  module.exports = new pg.Pool(config);