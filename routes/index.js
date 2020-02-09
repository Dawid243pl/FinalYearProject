var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const fetch = require("node-fetch");

//const bodyParser = require('body-parser')

// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
router.use(express.json());




/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);

  if (req.session.loggedin){
    console.log("WElcome back,"+req.session.userEmail+'!');
    //document.getElementById("#lgIn").style.visibility = 'hidden';
  }else{
    console.log("Please log in");
    //document.getElementById("#lgOut").style.visibility = 'hidden';
  }
  res.render('index', { title: '',userMail:req.session.userEmail});


});


const pool2 = mysql.createPool({

  host:'localhost',
  user:'root',
  database:'postcodeapi'

})

function getConnection2(){
  return pool2
  
  /*mysql.createConnection({

      host: 'localhost',
      user: 'root',
      database: 'restapi_mysql'
      //password:

   })   
*/

}

router.get('/form', function(req, res, next) {
 
  res.render('form', { title: '' });


});

router.get('/form2', function(req, res, next) {
 
  res.render('form2', { title: '' });


});

router.get('/makeDB', function(req, res, next) {
 
  res.render('addToDbView', { title: '' });


});





/*
router.post('/user_create',(req,res)=>{

  console.log("trying to make a new user");
  console.log("How to get data");

  console.log("first name",req.body.create_firstname);
  console.log("last name",req.body.create_lastname);

  const firstName = req.body.create_firstname;
  const lastName = req.body.create_lastname;

  const connection = getConnection();

  const queryString = "REPLACE INTO users (first_name,last_name) VALUES (?,?)"; 

  connection.query(queryString,[firstName,lastName], (err,result,fields) =>{


    if (err){
      console.log("failed to insert new user"+err)
      return
    }

    console.log("inserted a new user with the id",result.insertId);
    res.end()
  })


 
})
*/
/*
router.get("/users", (req,res) => {

  const user1 = {firstName: "stephen", lastName: "cos"}

  const user2 = {firstName: "Dawid", lastName: "Koleczko"}

  res.json([user1,user2]);

})
*/
/*
router.get('/user/:id', (req,res)=>{
  console.log("fetch id"+req.params.id);

  const connection = getConnection();
  
  const queryString = "SELECT * FROM users WHERE id =?";
  const userId = req.params.id;

  connection.query(queryString,[req.params.id],(err,rows,fields)=>{
    if (err){
      console.log("failed to query for users"+err)
      res.end()
      return
    }
    console.log("i think we fetched sucessfuly");

    //custom format for json response
    const users = rows.map((row)=> {
      return {firstName: row.first_name,lastName: row.last_name}
    })

    res.json(users);

  })
  //res.end();
});

*/


router.get('/crime_create/:wardName/:bulglary/:sexualOffence/:AllCrimes/:totalPop/:Year',(req,res)=>{

  const wrd = req.params.wardName;
  const bulglary = req.params.bulglary;
  const sexualOffence = req.params.sexualOffence;
  const allCrimes = req.params.AllCrimes;
  const TotalPop = req.params.totalPop;
  const year = req.params.Year;


console.log("trying to make a new user");
console.log("How to get data");

//console.log("all params",request.params);
//console.log("last name",req.body.create_lastname);
/*
const wrd = req.body.create_ward;
const bulglary = req.body.create_bulglary;
const sexualOffence = req.body.create_sexOffemce;
const allCrimes = req.body.create_allCrimes;
const TotalPop = req.body.create_pop;
*/
//console.log(req.params);

console.log("all params",wrd,bulglary,sexualOffence,allCrimes,TotalPop,year);

  const connection = getConnection2();

  const queryString = "REPLACE INTO crime (WardName,burglary,sexual_offences,total_crimes,total_population,year) VALUES (?,?,?,?,?,?)";
  
  

  connection.query(queryString,[wrd,bulglary,sexualOffence,allCrimes,TotalPop,year], (err,result,fields) =>{


    if (err){
      console.log("failed to insert new user"+err)
      return
    }

    console.log("inserted a new user with the id",result.insertId);
    res.end()
  })



})



router.get('/listCrime/:id', (req,res)=>{
  
  const connection = getConnection2();
  
  //const queryString = "SELECT * FROM crime WHERE WardName =?";
  const queryString = "SELECT * FROM crime";
  const userId = req.params.id;

  connection.query(queryString,[userId],(err,rows,fields)=>{
    if (err){
      console.log("failed to query for users"+err)
      res.end()
      return
    }
    console.log("i think we fetched sucessfuly");

    //custom format for json response
   
    const users = rows.map((row)=> {
      return {WardName: row.WardName,bulgary: row.burglary,sexOffence:row.sexual_offences, totalCrimes: row.total_crimes,population:row.total_population,year:row.year}
  

    })

    res.json(users);

  })
  //res.end();
});


router.get('/listCrimes', (req,res)=>{
  
  const connection = getConnection2();
  
  const queryString = "SELECT * FROM crime";
  const userId = req.params.id;

  connection.query(queryString,[userId],(err,rows,fields)=>{
    if (err){
      console.log("failed to query for users"+err)
      res.end()
      return
    }
    console.log("i think we fetched sucessfuly");

    //custom format for json response
   
    const users = rows.map((row)=> {
      return {WardName: row.WardName,bulgary: row.burglary,sexOffence:row.sexual_offences, totalCrimes: row.total_crimes,population:row.total_population}
  

    })

    res.json(users);

  })
  //res.end();
});




router.get('/listQuallity/:id', (req,res)=>{
  
  const connection = getConnection2();
  
  const queryString = "SELECT * FROM quallitylife WHERE WardName =? AND total > 0";
  const userId = req.params.id;

  connection.query(queryString,[userId],(err,rows,fields)=>{
    if (err){
      console.log("failed to query for users"+err)
      res.end()
      return
    }
    console.log("i think we fetched sucessfuly");

    //custom format for json response
    
   
    const users = rows.map((row)=> {
      return {WardName: row.WardName,Indicator: row.Indicator,Theme:row.Theme, Total: row.Total}
  

    })

    res.json(users);

  })
  //res.end();
});

//router.get('/crime_create/:wardName/:bulglary/:sexualOffence/:AllCrimes/:totalPop',(req,res)=>{

router.get('/quallity_create/:ward/:indicator/:theme/:total',(req,res)=>{

  const wrd = req.params.ward;
  const indicator = req.params.indicator;
  const theme = req.params.theme;
  const total = req.params.total;
 
  console.log("check",wrd,indicator,theme,total);
  const connection = getConnection2();
  

  const queryString = "REPLACE INTO quallitylife (WardName,Indicator,Theme,Total) VALUES (?,?,?,?)"; 

  connection.query(queryString,[wrd,indicator,theme,total], (err,result,fields) =>{

    if (err){
      console.log("failed to insert new user"+err)
      return
    }

    console.log("inserted a new user with the id",result.insertId);
    res.end()
  })



})




// Access the parse results as request.body
router.post('/findArea', function(req, res){
    //console.log(request.body.say);

    var area = req.body.say;
    var lat =  req.body.lat;
    var long =  req.body.long;
      
    if (req.session.loggedin){
      console.log("WElcome back,"+req.session.userEmail+'!');
      //document.getElementById("#lgIn").style.visibility = 'hidden';
    }else{
      console.log("Please log in");
      //document.getElementById("#lgOut").style.visibility = 'hidden';
    }
    
    res.render('searchOutput', { title:area,userMail:req.session.userEmail});
  

});


router.get('/user/:id',(req,res)=>{
  res.send(req.params.id);

});

/*
router.get('/policeData/:date/:lat/:long',function(req,res){
  
  const request = require('request');

  var datez =req.params.date;
  var latz = req.params.lat;
  var longz = req.params.long;

  console.log(datez,latz,longz);
  //res.send(req.params.lat);
  //res.send(req.params.long);
 
  var url2 = "https://data.police.uk/api/crimes-at-location?date="+datez+"&lat="+latz+"&lng="+longz;
      
  console.log("url2",url2);

  res.send(
    request(url2, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log("body?",body);
      
    })

);
  
//console.log(content);
//res.send(content);


});
*/
/*
router.get('/users/:id', function(req, res, next) {
  var user = users.getUserById(req.params.id);
  res.json(user);
});


exports.getUserById = function(id) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == id) return users[i];
  }
};
*/





router.get('/policeData/:date/:lat/:lon', async (request, response) => {

  //console.log(request.params);
  //const latlon = request.params.latlon.split(',');
  //console.log(latlon);
  const lat = request.params.lat;
  const lon = request.params.lon;
  const date = request.params.date;

  console.log(lat, lon,date);
  //const api_key = "4292d79319e2ad9eae7e37f874bf66b3";
  const police_url = `https://data.police.uk/api/crimes-at-location?date=${date}&lat=${lat}&lng=${lon}`;
  const police_response = await fetch(police_url);
  const police_data = await police_response.json();
/*
  const aq_url = `https://api.openaq.org/v1/latest?locations/coordinates=${lat},${lon}?radius=2500`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();
*/
  const data = {
    police: police_data,
    //air_quality: aq_data
  };
  response.json(data);
});




router.get('/weather/:lat/:lon', async (request, response) => {
  
  //console.log(request.params);
  //const latlon = request.params.latlon.split(',');
  //console.log(latlon);
  const lat = request.params.lat;
  const lon = request.params.lon;
  console.log(lat, lon);
  const api_key = "4292d79319e2ad9eae7e37f874bf66b3";
  const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}/?units=si`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  const xaccesstoken = "eyJhbGciOiJIUzI1NiJ9.OGVhY2Y4YjAtMjgxYi0xMWVhLWI1MmMtZDMwZGU3OTk2NTMw.8enNkjxpH-8gtjqAmaFWuYYW431NFH5wkNVYIozMGkQ";

  const aq_url = `https://api.openaq.org/v1/latest?locations/coordinates=${lat},${lon}/?radius=10`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();

  const data = {
    weather: weather_data,
    air_quality: aq_data
  };
  response.json(data);
});







router.get('/postCode/:ps', async (request, response) => {


  //console.log(request.params);
  //const latlon = request.params.latlon.split(',');
  //console.log(latlon);
  const postcode = request.params.ps;
 
  
  //const api_key = "4292d79319e2ad9eae7e37f874bf66b3";
  const postcode_url = `https://api.postcodes.io/postcodes/${postcode}`;
  const postcode_response = await fetch(postcode_url);
  const postcode_data = await postcode_response.json();
/*
  const aq_url = `https://api.openaq.org/v1/latest?locations/coordinates=${lat},${lon}?radius=2500`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();
*/
  const data = {
    postcode: postcode_data,
    //air_quality: aq_data
  };
  response.json(data);
});




router.get('/ward/:wardName', async (request, response) => {


  //console.log(request.params);
  //const latlon = request.params.latlon.split(',');
  //console.log(latlon);
  const ward = request.params.wardName;
 
  
  //const api_key = "4292d79319e2ad9eae7e37f874bf66b3";
  const ward_url = `https://api.postcodes.io/postcodes/${ward}`;
  const ward_response = await fetch(ward_url);
  const ward_data = await ward_response.json();
/*
  const aq_url = `https://api.openaq.org/v1/latest?locations/coordinates=${lat},${lon}?radius=2500`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();
*/
  const data = {
    ward: ward_data,
    //air_quality: aq_data
  };
  response.json(data);
});


router.get('/crimes/:wardName', async (request, response) => {


  //console.log(request.params);
  //const latlon = request.params.latlon.split(',');
  //console.log(latlon);
  const crimes = request.params.wardName;
 
  
  //const api_key = "4292d79319e2ad9eae7e37f874bf66b3";
  const crimes_url = `https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=crime-recorded-by-police-by-selected-offence-groups-in-bristol-by-ward&facet=ward_name&facet=year&refine.ward_name=${crimes}`;
  const crimes_response = await fetch(crimes_url);
  const crimes_data = await crimes_response.json();

  const all_wards_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/crime-recorded-by-police-by-selected-offence-groups-in-bristol-by-ward/records?rows=100&select=all_crimes_number,%20violent_sexual_offences_number,%20burglary_number,%20ward_name,%20latest_mid_year_population_estimates_for_ward&where="2018/19"`;
  const all_wards_response = await fetch(all_wards_url);
  const all_wards_data = await all_wards_response.json();

  const year_17_18_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/crime-recorded-by-police-by-selected-offence-groups-in-bristol-by-ward/records?rows=100&select=all_crimes_number,%20violent_sexual_offences_number,%20burglary_number,%20ward_name,%20latest_mid_year_population_estimates_for_ward&where="2017/18"`;
  const year_17_18_response = await fetch(year_17_18_url);
  const year_17_18_data = await year_17_18_response.json();

  const year_16_17_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/crime-recorded-by-police-by-selected-offence-groups-in-bristol-by-ward/records?rows=100&select=all_crimes_number,%20violent_sexual_offences_number,%20burglary_number,%20ward_name,%20latest_mid_year_population_estimates_for_ward&where="2016/17"`;
  const year_16_17_response = await fetch(year_16_17_url);
  const year_16_17_data = await year_16_17_response.json();

  const data = {
    //Current_ward: crimes_data,
    all_wards: all_wards_data,
    year_17_18: year_17_18_data,
    year_16_17: year_16_17_data
  };
  
  response.json(data);
  
});







router.get('/education/:wardName', async (request, response) => {


  //console.log(request.params);
  //const latlon = request.params.latlon.split(',');
  //console.log(latlon);
  const crimes = request.params.wardName;
 
  
  //const api_key = "4292d79319e2ad9eae7e37f874bf66b3";
  const education_url = `https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=early-years-pupils-achieving-a-good-level-of-development-in-bristol&rows=9999&sort=-number_of_pupils_achieving_a_good_level_of_development&facet=ward_name&facet=time_period&refine.ward_name=${crimes}`;
  const education_response = await fetch(education_url);
  const education_data = await education_response.json();

  const all_wards_url = `https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=early-years-pupils-achieving-a-good-level-of-development-in-bristol&rows=9999&sort=-number_of_pupils_achieving_a_good_level_of_development&facet=ward_name&facet=time_period`;
  const all_wards_response = await fetch(all_wards_url);
  const all_wards_data = await all_wards_response.json();

  const data = {
    Current_ward: education_data,
    //all_wards: all_wards_data
  };
  response.json(data);
});

router.get('/listWards', async (request, response) => {


 
  const list_of_wards = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/wards/records?&rows=100&select=name`;
  const list_of_wards_response = await fetch(list_of_wards);
  const list_of_wards_json = await list_of_wards_response.json();

  const data = {
    wards:list_of_wards_json
  };
  response.json(data);

});


router.get('/Quallity/:wardName', async (request, response) => {

  //console.log(request.params);
  //const latlon = request.params.latlon.split(',');
  //console.log(latlon);
  var crimes = request.params.wardName;
 
  //console.log("encoded",encodeURI(crimes));
  //console.log("DECODEURI COMONENT",decodeURIComponent(crimes));
  //console.log("decodeURI",decodeURI(crimes));

  //console.log("blank",crimes);
  //console.log("test",crimes.replace(/&/,"%26"));

  crimes = crimes.replace(/&/,"%26");
  //const api_key = "4292d79319e2ad9eae7e37f874bf66b3";
  /*
  const health_url = `https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=quality-of-life-2018-19-ward&rows=9999&facet=indicator&facet=theme_indicator&facet=ward_name&refine.theme_indicator=Health+%26+Wellbeing&refine.ward_name=${crimes}`;
  const health_response = await fetch(health_url);
  const health_data = await health_response.json();

  const all_wards_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/quality-of-life-2018-19-ward/records?rows=100&select=indicator,%20theme,%20ward_name,%20upper_confidence_limit,%20lower_confidence_limit`;
  const all_wards_response = await fetch(all_wards_url);
  const all_wards_data = await all_wards_response.json();
*/
  
  const specific_crime_quallity = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/quality-of-life-2018-19-ward/records?refine=theme_indicator:Crime+%26+Safety&select=indicator,%20theme,%20ward_name,%20upper_confidence_limit,%20lower_confidence_limit&refine=ward_name:${crimes}`;
  console.log(specific_crime_quallity);
  
  const specific_crime_quallity_response = await fetch(specific_crime_quallity);
  const crime_quallity_of_life = await specific_crime_quallity_response.json();

  

  const data = {
    //health: health_data,
    //all_wards: all_wards_data,
    crimeQ:crime_quallity_of_life
  };
  response.json(data);
});







router.get('/population', async (request, response) => {


  const population_18_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/population-mid-2012-to-mid-2017-by-broad-age-band-2016-ward/records?rows=100&refine=mid_year:2018`;
  const population_18_response = await fetch(population_18_url);
  const population_18_data = await population_18_response.json();

  const population_17_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/population-mid-2012-to-mid-2017-by-broad-age-band-2016-ward/records?rows=100&refine=mid_year:2017`;
  const population_17_response = await fetch(population_17_url);
  const population_17_data = await population_17_response.json();

  const population_16_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/population-mid-2012-to-mid-2017-by-broad-age-band-2016-ward/records?rows=100&refine=mid_year:2016`;
  const population_16_response = await fetch(population_16_url);
  const population_16_data = await population_16_response.json();

  const population_15_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/population-mid-2012-to-mid-2017-by-broad-age-band-2016-ward/records?rows=100&refine=mid_year:2015`;
  const population_15_response = await fetch(population_15_url);
  const population_15_data = await population_15_response.json();

  const population_14_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/population-mid-2012-to-mid-2017-by-broad-age-band-2016-ward/records?rows=100&refine=mid_year:2014`;
  const population_14_response = await fetch(population_14_url);
  const population_14_data = await population_14_response.json();

  const population_13_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/population-mid-2012-to-mid-2017-by-broad-age-band-2016-ward/records?rows=100&refine=mid_year:2013`;
  const population_13_response = await fetch(population_13_url);
  const population_13_data = await population_13_response.json();

  const population_12_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/population-mid-2012-to-mid-2017-by-broad-age-band-2016-ward/records?rows=100&refine=mid_year:2012`;
  const population_12_response = await fetch(population_12_url);
  const population_12_data = await population_12_response.json();

  

  const data = {

    population_18: population_18_data,
    population_17: population_17_data,
    population_16: population_16_data,
    population_15: population_15_data,
    population_14: population_14_data,
    population_13: population_13_data,
    population_12: population_12_data,


  };
  
  response.json(data);
  
});



router.get('/population_create/:ward/:year/:workingAgeP/:olderPP/:childrenP/:workingAgeN/:olderPN/:childrenN/:totalPop',(req,res)=>{

  const wrd = req.params.ward;
  const yr = req.params.year;
  const wAgeP = req.params.workingAgeP;
  const olderPP = req.params.olderPP;
  const childP = req.params.childrenP;
  const wAgeN = req.params.workingAgeN;
  const olderPN = req.params.olderPN;
  const childN = req.params.childrenN;
  const totalPop = req.params.totalPop;

  const connection = getConnection2();
  

  const queryString = "REPLACE INTO population (WardName,Year,wAgePer,olderPPer,childrenPer,wAgeNumb,olderPNumb,childrenNumb,totalPop) VALUES (?,?,?,?,?,?,?,?,?)"; 

  connection.query(queryString,[wrd,yr,wAgeP,olderPP,childP,wAgeN,olderPN,childN,totalPop], (err,result,fields) =>{

    if (err){
      console.log("failed to insert new user"+err)
      return
    }

    console.log("inserted a new user with the id",result.insertId);
    res.end()
  })



})



router.get('/getPopulation', (req,res)=>{
  
  const connection = getConnection2();
  
  const queryString = "SELECT * FROM population";

  connection.query(queryString,(err,rows,fields)=>{
    if (err){
      console.log("failed to query for users"+err)
      res.end()
      return
    }
    console.log("i think we fetched sucessfuly");

    //custom format for json response
    
    const users = rows.map((row)=> {
      return {WardName: row.WardName,Year: row.Year,wAgePer:row.wAgePer, olderPPer: row.olderPPer, childrenPer: row.childrenPer, wAgeNumb: row.wAgeNumb, olderPNumb: row.olderPNumb, childrenNumb: row.childrenNumb, totalPop: row.totalPop}
  

    })

    res.json(users);

  })
  //res.end();
});


router.get('/air', function(req, res, next) {
  
  const request = require('request');
  https://opendata.bristol.gov.uk/explore/dataset/no2-diffusion-tube-data/api/?disjunctive.location&rows=9999&refine.year=2018&location=12,51.46727,-2.60342
request('https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=no2-diffusion-tube-data&rows=9999&refine.year=2018&location=12,51.46727,-2.60342/?apikey=f032bd51ccead3c84bcd9ac2ec6c958db3bb016f42972f026d867912', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.records[0].fields.ward_name,body.records[0].fields.indicator,body.records[0].fields.statistic);
  console.log(body.records);


});
  
});



router.get('/zooplaAPI/:postCode', async (request, response) => {

  const ps = request.params.postCode;
;
  //const api_key = "prvnzm87zkdky5tkdakmv834";
  //http://api.zoopla.co.uk/api/v1/average_sold_prices.json?postcode=bs57tw&output_type=county&area_type=towns&api_key=prvnzm87zkdky5tkdakmv834

  const zoopla_url = `http://api.zoopla.co.uk/api/v1/average_area_sold_price.json?postcode=${ps}&output_type=postcode&api_key=prvnzm87zkdky5tkdakmv834`;
  const zoopla_response = await fetch(zoopla_url);
  const zoopla_data = await zoopla_response.json();

  const zoopla_url_bristol = `http://api.zoopla.co.uk/api/v1/average_sold_prices.json?postcode=${ps}&output_type=county&area_type=towns&api_key=prvnzm87zkdky5tkdakmv834`;
  const zoopla_response_bristol = await fetch(zoopla_url_bristol);
  const zoopla_data_bristol = await zoopla_response_bristol.json();

  const data = {
    zoopla: zoopla_data,
    zoopla_brs:zoopla_data_bristol,
  };
  response.json(data);
});


module.exports = router;