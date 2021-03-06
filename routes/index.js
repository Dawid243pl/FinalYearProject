/*File that deals with routing of the homepage,result page and with getting/inserting data from the api/databse */
var express = require('express');
var router = express.Router();
const mysql = require('mysql')
const fetch = require("node-fetch");
// Parse URL-encoded bodies (as sent by HTML forms)
router.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
router.use(express.json());
/* Home page router */
router.get('/', function(req, res, next) {
	console.log(req.session);
	//check if logged in
	if (req.session.loggedin) {
		console.log("Account type," + req.session.userType + '!');
		console.log("WElcome back," + req.session.userEmail + '!');
		//document.getElementById("#lgIn").style.visibility = 'hidden';
	} else {
		console.log("Please log in");
		//document.getElementById("#lgOut").style.visibility = 'hidden';
	}
	//render the home page
	res.render('index', {
		title: '',
		userMail: req.session.userEmail,
		accountType: req.session.userType
	});
});
//create a mysql pool with database data
const pool2 = mysql.createPool({
	host: 'localhost',
	user: 'root',
	database: 'postcodeapi'
})
//create a connection to mysql by calling the pool
function getConnection2() {
	return pool2
	/*mysql.createConnection({

      host: 'localhost',
      user: 'root',
      database: 'restapi_mysql'
      //password:

   })   
*/
}
//Router for making the database
router.get('/makeDB', function(req, res, next) {
	res.render('addToDbView', {
		title: ''
	});
});
//Router that recieves crime input and inserts the data into the database
router.get('/crime_create/:wardName/:Year/:bulglary/:sexualOffence/:AllCrimes/:totalPop', (req, res) => {
	const wrd = req.params.wardName;
	const bulglary = req.params.bulglary;
	const sexualOffence = req.params.sexualOffence;
	const allCrimes = req.params.AllCrimes;
	const TotalPop = req.params.totalPop;
	const year = req.params.Year;
	const connection = getConnection2();
	const queryString = "REPLACE INTO crime (WardName,Year,Burglary,sexualOffences,totalCrimes,totalPopulation) VALUES (?,?,?,?,?,?)";
	connection.query(queryString, [wrd, year, bulglary, sexualOffence, allCrimes, TotalPop], (err, result, fields) => {
		if (err) {
			console.log("failed to insert new user" + err)
			return
		}
		res.end()
	})
})
//router for getting a crime by its ID
router.get('/listCrime/:id', (req, res) => {
	const connection = getConnection2();
	//const queryString = "SELECT * FROM crime WHERE WardName =?";
	const queryString = "SELECT * FROM crime";
	const userId = req.params.id;
	connection.query(queryString, [userId], (err, rows, fields) => {
		if (err) {
			console.log("failed to query for users" + err)
			res.end()
			return
		}
		console.log("i think we fetched sucessfuly");
		const users = rows.map((row) => {
			return {
				WardName: row.WardName,
				year: row.Year,
				bulgary: row.Burglary,
				sexOffence: row.sexualOffences,
				totalCrimes: row.totalCrimes,
				population: row.totalPopulation
			}
		})
		res.json(users);
	})
	//res.end();
});
//router for getting all of the crimes
router.get('/listCrimes', (req, res) => {
	const connection = getConnection2();
	const queryString = "SELECT * FROM crime";
	const userId = req.params.id;
	connection.query(queryString, [userId], (err, rows, fields) => {
		if (err) {
			console.log("failed to query for users" + err)
			res.end()
			return
		}
		console.log("i think we fetched sucessfuly");
		//custom format for json response
		const users = rows.map((row) => {
			return {
				WardName: row.WardName,
				year: row.Year,
				bulgary: row.Burglary,
				sexOffence: row.sexualOffences,
				totalCrimes: row.totalCrimes,
				population: row.totalPopulation
			}
		})
		res.json(users);
	})
	//res.end();
});
//router for getting a quallity of life inidcator by id
router.get('/listQuallity/:id', (req, res) => {
	const connection = getConnection2();
	const queryString = "SELECT * FROM quallity_of_life WHERE WardName =? AND total > 0";
	const userId = req.params.id;
	connection.query(queryString, [userId], (err, rows, fields) => {
		if (err) {
			console.log("failed to query for users" + err)
			res.end()
			return
		}
		console.log("i think we fetched sucessfuly");
		//custom format for json response
		const users = rows.map((row) => {
			return {
				WardName: row.WardName,
				Indicator: row.Indicator,
				Theme: row.Theme,
				Total: row.Total
			}
		})
		res.json(users);
	})
	//res.end();
});
//router that recieves quallity of life indicators and inputs them into the database
router.get('/quallity_create/:ward/:indicator/:theme/:total', (req, res) => {
	const wrd = req.params.ward;
	const indicator = req.params.indicator;
	const theme = req.params.theme;
	const total = req.params.total;
	console.log("check", wrd, indicator, theme, total);
	const connection = getConnection2();
	const queryString = "REPLACE INTO quallity_of_life (WardName,Indicator,Theme,Total) VALUES (?,?,?,?)";
	connection.query(queryString, [wrd, indicator, theme, total], (err, result, fields) => {
		if (err) {
			console.log("failed to insert new user" + err)
			return
		}
		//console.log("inserted a new user with the id",result.insertId);
		res.end()
	})
})
//router that renders the results page
router.post('/findArea', function(req, res) {
	var area = req.body.say;
	var lat = req.body.lat;
	var long = req.body.long;
	res.render('searchOutput', {
		title: area,
		userMail: req.session.userEmail,
		accountType: req.session.userType,
		latz: lat,
		longz: long
	});
});
//router for getting a user with a specific id
router.get('/user/:id', (req, res) => {
	res.send(req.params.id);
});
//router for recieving police data from the API and rendering it
router.get('/policeData/:date/:lat/:lon', async (request, response) => {
	const lat = request.params.lat;
	const lon = request.params.lon;
	const date = request.params.date;
	console.log(lat, lon, date);
	//const api_key = "4292d79319e2ad9eae7e37f874bf66b3";
	const police_url = `https://data.police.uk/api/crimes-at-location?date=${date}&lat=${lat}&lng=${lon}`;
	const police_response = await fetch(police_url);
	const police_data = await police_response.json();
	const data = {
		police: police_data,
	};
	response.json(data);
});
//rotuer that gets the postcode API infromation and renders it
router.get('/postCode/:ps', async (request, response) => {
	const postcode = request.params.ps;
	//const api_key = "4292d79319e2ad9eae7e37f874bf66b3";
	const postcode_url = `https://api.postcodes.io/postcodes/${postcode}`;
	const postcode_response = await fetch(postcode_url);
	const postcode_data = await postcode_response.json();
	const data = {
		postcode: postcode_data,
	};
	response.json(data);
});
//router that checks the postcode api by lat and long. this router renders this data
router.get('/postCode2/:lat/:long', async (request, response) => {
	const lat = request.params.lat;
	const long = request.params.long;
	const postcode_url = `https://api.postcodes.io/postcodes?lon=${lat}&lat=${long}`;
	const postcode_response = await fetch(postcode_url);
	const postcode_data = await postcode_response.json();
	const data = {
		postcode: postcode_data,
	};
	response.json(data);
});
//router that recieves the ward name and renders postcode data
router.get('/ward/:wardName', async (request, response) => {
	const ward = request.params.wardName;
	//const api_key = "4292d79319e2ad9eae7e37f874bf66b3";
	const ward_url = `https://api.postcodes.io/postcodes/${ward}`;
	const ward_response = await fetch(ward_url);
	const ward_data = await ward_response.json();
	const data = {
		ward: ward_data,
	};
	response.json(data);
});
//rotuer that gets all the crimes from the api and renders them
router.get('/crimes/:wardName', async (request, response) => {
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
	//const year_16_17_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/crime-recorded-by-police-by-selected-offence-groups-in-bristol-by-ward/records?rows=100&select=all_crimes_number,%20violent_sexual_offences_number,%20burglary_number,%20ward_name,%20latest_mid_year_population_estimates_for_ward&where="2016/17"`;
	const year_16_17_url = `https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=crime-recorded-by-police-by-selected-offence-groups-in-bristol-by-ward&rows=100&sort=ward_name&refine.year=2016%2F17`;
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
//router that lists all of the wards from the api in bristol
router.get('/listWards', async (request, response) => {
	const list_of_wards = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/wards/records?&rows=100&select=name`;
	const list_of_wards_response = await fetch(list_of_wards);
	const list_of_wards_json = await list_of_wards_response.json();
	const data = {
		wards: list_of_wards_json
	};
	response.json(data);
});
//router that finds quallity of life data from the api and renders them
router.get('/Quallity/:wardName', async (request, response) => {
	var crimes = request.params.wardName;
	crimes = crimes.replace(/&/, "%26");
	const specific_crime_quallity = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/quality-of-life-2018-19-ward/records?refine=theme_indicator:Crime+%26+Safety&select=indicator,%20theme,%20ward_name,%20upper_confidence_limit,%20lower_confidence_limit&refine=ward_name:${crimes}`;
	console.log(specific_crime_quallity);
	const specific_crime_quallity_response = await fetch(specific_crime_quallity);
	const crime_quallity_of_life = await specific_crime_quallity_response.json();
	const specific_transport = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/quality-of-life-2018-19-ward/records?refine=theme_indicator:Transport&select=indicator,%20theme,%20ward_name,%20upper_confidence_limit,%20lower_confidence_limit&refine=ward_name:${crimes}`;
	console.log(specific_transport);
	const specific_transport_response = await fetch(specific_transport);
	const transport = await specific_transport_response.json();
	const data = {
		crimeQ: crime_quallity_of_life,
		transportQ: transport
	};
	response.json(data);
});
//router that gets all of the population data from the api and renders them
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
//router that recieves population data and adds it to the database
router.get('/population_create/:ward/:year/:workingAgeP/:olderPP/:childrenP/:workingAgeN/:olderPN/:childrenN/:totalPop', (req, res) => {
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
	connection.query(queryString, [wrd, yr, wAgeP, olderPP, childP, wAgeN, olderPN, childN, totalPop], (err, result, fields) => {
		if (err) {
			console.log("failed to insert new user" + err)
			return
		}
		//console.log("inserted a new user with the id",result.insertId);
		res.end()
	})
})
//function that recieves a ward and inserts it into a database
router.get('/ward_create/:ward', (req, res) => {
	const wrd = req.params.ward;
	const connection = getConnection2();
	const queryString = "REPLACE INTO ward (WardName) VALUES (?)";
	connection.query(queryString, [wrd], (err, result, fields) => {
		if (err) {
			console.log("failed to insert new user" + err)
			return
		}
		//console.log("inserted a new user with the id",result.insertId);
		res.end()
	})
})
//router that gets the population the population data from the database and renders it
router.get('/getPopulation', (req, res) => {
	const connection = getConnection2();
	const queryString = "SELECT * FROM population";
	connection.query(queryString, (err, rows, fields) => {
		if (err) {
			console.log("failed to query for users" + err)
			res.end()
			return
		}
		console.log("i think we fetched sucessfuly");
		//custom format for json response
		const users = rows.map((row) => {
			return {
				WardName: row.WardName,
				Year: row.Year,
				wAgePer: row.wAgePer,
				olderPPer: row.olderPPer,
				childrenPer: row.childrenPer,
				wAgeNumb: row.wAgeNumb,
				olderPNumb: row.olderPNumb,
				childrenNumb: row.childrenNumb,
				totalPop: row.totalPop
			}
		})
		res.json(users);
	})
	//res.end();
});
//router that gets housing prices infromation from the zoopla api and renders it
router.get('/zooplaAPI/:postCode', async (request, response) => {
	const ps = request.params.postCode;
	//const api_key = "prvnzm87zkdky5tkdakmv834";
	const zoopla_url = `http://api.zoopla.co.uk/api/v1/average_area_sold_price.json?postcode=${ps}&output_type=postcode&api_key=prvnzm87zkdky5tkdakmv834`;
	const zoopla_response = await fetch(zoopla_url);
	const zoopla_data = await zoopla_response.json();
	const zoopla_url_bristol = `http://api.zoopla.co.uk/api/v1/average_sold_prices.json?postcode=${ps}&output_type=county&area_type=towns&api_key=prvnzm87zkdky5tkdakmv834`;
	const zoopla_response_bristol = await fetch(zoopla_url_bristol);
	const zoopla_data_bristol = await zoopla_response_bristol.json();
	const zoopla_url_outcode = `http://api.zoopla.co.uk/api/v1/average_area_sold_price.json?postcode=${ps}&output_type=outcode&api_key=prvnzm87zkdky5tkdakmv834`;
	const zoopla_response_outcode = await fetch(zoopla_url_outcode);
	const zoopla_data_outcode = await zoopla_response_outcode.json();
	const data = {
		zoopla: zoopla_data,
		zoopla_brs: zoopla_data_bristol,
		zoopla_outcode: zoopla_data_outcode
	};
	response.json(data);
});
//router that gets housing data from the api and renders it
router.get('/housing', async (request, response) => {
	const housing_size_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/household-size-and-bedrooms-2011-census-by-2016-ward/records?rows=100`;
	const housing_size_response = await fetch(housing_size_url);
	const housing_size_data = await housing_size_response.json();
	const housing_type_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/housing-type-2011-census-by-2016-ward/records?rows=100`;
	const housing_type_response = await fetch(housing_type_url);
	const housing_type_data = await housing_type_response.json();
	const housing_tenure_url = `https://opendata.bristol.gov.uk/api/v2/catalog/datasets/housing-tenure-2011-census-by-2016-ward/records?rows=100`;
	const housing_tenure_response = await fetch(housing_tenure_url);
	const housing_tenure_data = await housing_tenure_response.json();
	const data = {
		housing_size: housing_size_data,
		housing_type: housing_type_data,
		housing_tenure: housing_tenure_data
	};
	response.json(data);
});
module.exports = router;