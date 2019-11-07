const mysql = require("mysql2");

let db = mysql.createPool({
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b8ab86b35972c4",
  password: "459cc57c",
  database: "heroku_4f22c6069cb8e89",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 *  return value is a connection pool with promise wrapper
 *  one usage example:
 *   db.execute("select * from test")
    .then(([rows, fields]) => {
      console.log("rows:" + JSON.stringify(rows));
    })
    .catch(err => console.log("error: " + err));
 */
module.exports = db.promise();
