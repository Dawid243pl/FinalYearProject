var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 
  res.render('index', { title: '' });


});


// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
router.use(express.json());

// Access the parse results as request.body
router.post('/findArea', function(req, res){
    //console.log(request.body.say);

    var area = req.body.say;
    var lat =  req.body.lat;
    var long =  req.body.long;  
  
    
    res.render('searchOutput', { title:area});
  

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
  const fetch = require("node-fetch");
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
  const fetch = require("node-fetch");
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

  const aq_url = `https://api.openaq.org/v1/latest?locations/coordinates=${lat},${lon}?radius=10`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();

  const data = {
    weather: weather_data,
    air_quality: aq_data
  };
  response.json(data);
});







router.get('/postCode/:ps', async (request, response) => {

  const fetch = require("node-fetch");
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




















/*
router.get('/weather', function(req, res, next) {
  
  const request = require('request');

request('https://api.openweathermap.org/data/2.5/forecast?q=Edinburgh,gb&units=metric&APPID=6d958d0832ecb8a256f5b68533cd9014', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.city.name);
});
  
});
*/


router.get('/crime', function(req, res, next) {
  
  const request = require('request');

request('https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=quality-of-life-2015-16-ward&facet=indicator&facet=theme&facet=ward_name/?apikey=f032bd51ccead3c84bcd9ac2ec6c958db3bb016f42972f026d867912', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.records[0].fields.ward_name,body.records[0].fields.indicator,body.records[0].fields.statistic);
  console.log(body);
  /*
  var check = body.records;
  console.log("big",check.length);
  for(var i=0;i < 10;i++ ){
    console.log(body.records[i].fields.ward_name);
  
  }
*/
});
  
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



router.get('/test', function(req, res, next) {
  
  const request = require('request');

 
request('https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=no2-diffusion-tube-data&rows=9999&facet=location&facet=year&facet=geopoint&refine.year=2018&refine.recordid=061bb86e7d650fe7b5cab3b90c20d69ea625b1c5&/?apikey=f032bd51ccead3c84bcd9ac2ec6c958db3bb016f42972f026d867912', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  //console.log(body.records[0].fields.ward_name,body.records[0].fields.indicator,body.records[0].fields.statistic);
  console.log(body.records);
});
  
});




module.exports = router;