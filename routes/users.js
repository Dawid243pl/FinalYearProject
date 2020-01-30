var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const fetch = require("node-fetch");
const bcryptjs = require("bcryptjs");



const pool = mysql.createPool({

  host:'localhost',
  user:'root',
  database:'postcodeapi'

})

function getConnection(){
  return pool
  
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/register', function(req, res, next) {
  res.render('registerUser', { title: '' });
});



router.post('/user_create',(req,res)=>{
  //to decrypt
  /*
  bcryptjs.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
});
*/
const connection = getConnection();

const queryString = "SELECT * FROM users WHERE email =?";
const userEmail = req.body.email;
    
connection.query(queryString,[userEmail],(err,rows,fields)=>{
  if (rows.length > 0){
    console.log("user found");
    console.log(rows);
  }else{
  
  console.log("user not found");
    console.log(rows);
    bcryptjs.hash(req.body.password,10,(err,hash)=>{
      if (err){
        return res.status(500).json({
          error:err
        }) 
      }else{
        const email = req.body.email;
        const firstName = req.body.fName;
        const lastName = req.body.lName;
        const password = hash;
        const address = req.body.address;
        const pCode = req.body.postCode;
        const city = req.body.city;
  
        console.log(email,firstName,lastName,password,pCode,address,city);
        
  
        const queryString = "REPLACE INTO users (Email,fName,lName,Password,Address,PostCode,City) VALUES (?,?,?,?,?,?,?)"; 
  
        connection.query(queryString,[email,firstName,lastName,password,pCode,address,city], (err,result,fields) =>{
  
          if (err){
            console.log("failed to insert new user"+err)
            return
          }
  
          console.log("inserted a new user with the id",result.insertId);
          res.end()
        })
      }
    });
  }

});


  
  
  //const wName = req.body.Ward_name;

  


 
})




module.exports = router;
