var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crimedb"

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Insert a record in the "customers" table:
  var sql = "INSERT INTO crime (burglary,sexual offences,total crimes,total population,WardName) VALUES ('1', '2','3','4','bdg')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});
