/*Function declaration file for functions that are called in checkPostCode.js*/
//getting the crime data
function getCrime(json_crime, ward) {
	var newJsonArrayWrd = [];
	var newJsonArrayBrs = [];
	var chartJsArray1Name = [];
	var chartJsArray2Name = [];
	var chartJsArray3Name = [];
	var chartJsArray1Stat = [];
	var chartJsArray2Stat = [];
	var chartJsArray3Stat = [];
	var chartJsArrayBrs = [];
	var chartJsArrayLabels = [];
	var colourActualWardCrime = [];
	var colourAvgWardCrime = [];
	var colourActualWardPop = [];
	var colourAvgWardPop = [];
	//loop for each ward in the json and thorugh different time periods
	$.each(json_crime, function(i) {
		//if the time period is 2018-19
		if (json_crime[i].year == "2018-19") {
			var wardCurrent = json_crime[i].WardName;
			var trendYears = json_crime[i].year;
			chartJsArrayLabels.push(trendYears);
			if (json_crime[i].WardName == ward) {
				var pop = json_crime[i].population;
				//save statistics and addd them to relative arrays for further usage
				var crimeStat3 = new Object();
				crimeStat3.name = "Total crimes";
				crimeStat3.percent = 100;
				crimeStat3.actual = numberWithCommas(json_crime[i].totalCrimes);
				crimeStat3.wName = json_crime[i].WardName;
				newJsonArrayWrd.push(crimeStat3);
				colourActualWardPop.push(pop);
				colourActualWardCrime.push(json_crime[i].totalCrimes);
			}
			if (json_crime[i].WardName == "Bristol") {
				var pop = json_crime[i].population;
				//save statistics and addd them to relative arrays for further usage
				housing_totalPieChartJS("totalpopBRS", "Bristol", pop, "default");
				var crimeStat1 = new Object();
				crimeStat1.name = "Total crimes";
				crimeStat1.percent = 100;
				crimeStat1.actual = numberWithCommas(json_crime[i].totalCrimes);
				crimeStat1.wName = json_crime[i].WardName;
				newJsonArrayBrs.push(crimeStat1);
				//create a visual for Bristol statistics
				housing_totalPieChartJS("totalcrimeBRS", "Bristol", json_crime[i].totalCrimes, "default");
				colourAvgWardPop.push(pop);
				colourAvgWardCrime.push(json_crime[i].totalCrimes);
			}
			if (json_crime[i].WardName != "Bristol") {
				//save statistics for all other wards and addd them to relative arrays for further usage
				var wardCurrent = json_crime[i].WardName;
				var stat = json_crime[i].totalCrimes;
				chartJsArray1Name.push(wardCurrent);
				chartJsArray1Stat.push(stat);
			}
		}
		//save statistics for all ward in previous years and addd them to relative arrays for further usage
		if (json_crime[i].year == "2017-18") {
			if (json_crime[i].WardName != "Bristol") {
				var wardCurrent = json_crime[i].WardName;
				var trendYears = json_crime[i].year;
				chartJsArrayLabels.push(trendYears);
				var stat = json_crime[i].totalCrimes;
				chartJsArray2Name.push(wardCurrent);
				chartJsArray2Stat.push(stat);
			}
		}
		if (json_crime[i].year == "2016-17") {
			if (json_crime[i].WardName != "Bristol") {
				var wardCurrent = json_crime[i].WardName;
				var trendYears = json_crime[i].year;
				chartJsArrayLabels.push(trendYears);
				var stat = json_crime[i].totalCrimes;
				chartJsArray3Name.push(wardCurrent);
				chartJsArray3Stat.push(stat);
			}
		}
	});
	//Create JSON objects from data in arrays to create visuals
	var makeJSONarr = [];
	var makeJSONbar = [];
	for (xy = 0; xy < chartJsArray1Stat.length; xy++) {
		if (chartJsArray1Name[xy] == ward) {
			var someObj = new Object();
			someObj.label = chartJsArray1Name[xy];
			someObj.data = [chartJsArray3Stat[xy], chartJsArray2Stat[xy], chartJsArray1Stat[xy]];
			someObj.backgroundColor = "#24252a";
			someObj.borderColor = '#007bff';
			someObj.fill = false;
			makeJSONarr.push(someObj);
		}
		if (chartJsArray1Name[xy] == ward) {
			var barObj = new Object();
			barObj.label = chartJsArray1Name[xy];
			barObj.data = [chartJsArray1Stat[xy]];
			barObj.backgroundColor = "#24252a";
			barObj.borderColor = '#24252a';
			barObj.fill = false;
		} else {
			var barObj = new Object();
			barObj.label = chartJsArray1Name[xy];
			barObj.data = [chartJsArray1Stat[xy]];
			barObj.backgroundColor = "#007bff";
			barObj.borderColor = '#007bff';
			barObj.fill = false;
		}
		makeJSONbar.push(barObj);
	}
	//Create the visuals from JSON objects
	makeChartJsCrime(chartJsArrayLabels[0], chartJsArrayLabels[1], chartJsArrayLabels[2], makeJSONarr);
	barChart("barCrime", makeJSONbar);
	//work out the colour coding
	var checkCrime = colourCoding(colourActualWardCrime[0], colourAvgWardCrime[0]);
	var checkPopulation = colourCoding(colourActualWardPop[0], colourAvgWardPop[0]);
	housing_totalPieChartJS("totalcrimeWard", ward, colourActualWardCrime[0], checkCrime);
	housing_totalPieChartJS("totalpopWard", ward, colourActualWardPop[0], checkPopulation, checkPopulation);
}

function getQuallity(json_quall) {
	$.each(json_quall, function(i) {
		if (json_quall[i].Theme == "Crime & Safety") {
			$(".list-group.crimez").append("<li class='my-list list-group-item d-flex justify-content-between align-items-center'><button class='fixed-btn btn btn-primary btn-sm'>" + json_quall[i].Total + "%</button> " + json_quall[i].Indicator + "</li>");
		}
		if (json_quall[i].Theme == "Transport") {
			$(".list-group.houz").append("<li class='my-list list-group-item d-flex justify-content-between align-items-center'><button class='fixed-btn btn btn-primary btn-sm'>" + json_quall[i].Total + "%</button> " + json_quall[i].Indicator + "</li>");
		}
	});
}

function getWeather(json_weather) {
	/*
	    weather = json_weather.weather.currently;

	    air = json_weather.air_quality.results[0].measurements[0];

	    document.getElementById('latitude').textContent = lat;
	    document.getElementById('longitude').textContent = long;
	    document.getElementById('summary').textContent = weather.summary;
	    document.getElementById('temp').textContent = weather.temperature;
	    document.getElementById('aq_parameter').textContent = air.parameter;
	    document.getElementById('aq_value').textContent = air.value;
	    document.getElementById('aq_units').textContent = air.unit;
	    document.getElementById('aq_date').textContent = air.lastUpdated;
	  */
}
//getting the population Data
function getPopulation(json_pop, ward) {
	//var brsAvg
	var yearArray = [];
	var workingAge = [];
	var children = [];
	var older = [];
	var totPop = [];
	var yearArrayAll = [];
	var workingAgeAll = [];
	var childrenAll = [];
	var olderAll = [];
	var totPopAll = [];
	var wardsAll = [];
	//for each ward in json if current ward grab the data for all of the years otherwise grab only data foe other wards in 2018
	$.each(json_pop, function(i) {
		if (json_pop[i].WardName == ward) {
			if (json_pop[i].Year == "2018") {
				yearArray.push(json_pop[i].Year);
				workingAge.push(json_pop[i].wAgeNumb);
				children.push(json_pop[i].childrenNumb);
				older.push(json_pop[i].olderPNumb);
				totPop.push(json_pop[i].totalPop);
			}
			if (json_pop[i].Year == "2017") {
				yearArray.push(json_pop[i].Year);
				workingAge.push(json_pop[i].wAgeNumb);
				children.push(json_pop[i].childrenNumb);
				older.push(json_pop[i].olderPNumb);
				totPop.push(json_pop[i].totalPop);
			}
			if (json_pop[i].Year == "2016") {
				yearArray.push(json_pop[i].Year);
				workingAge.push(json_pop[i].wAgeNumb);
				children.push(json_pop[i].childrenNumb);
				older.push(json_pop[i].olderPNumb);
				totPop.push(json_pop[i].totalPop);
			}
			if (json_pop[i].Year == "2015") {
				yearArray.push(json_pop[i].Year);
				workingAge.push(json_pop[i].wAgeNumb);
				children.push(json_pop[i].childrenNumb);
				older.push(json_pop[i].olderPNumb);
				totPop.push(json_pop[i].totalPop);
			}
			if (json_pop[i].Year == "2014") {
				yearArray.push(json_pop[i].Year);
				workingAge.push(json_pop[i].wAgeNumb);
				children.push(json_pop[i].childrenNumb);
				older.push(json_pop[i].olderPNumb);
				totPop.push(json_pop[i].totalPop);
			}
			if (json_pop[i].Year == "2013") {
				yearArray.push(json_pop[i].Year);
				workingAge.push(json_pop[i].wAgeNumb);
				children.push(json_pop[i].childrenNumb);
				older.push(json_pop[i].olderPNumb);
				totPop.push(json_pop[i].totalPop);
			}
			if (json_pop[i].Year == "2012") {
				yearArray.push(json_pop[i].Year);
				workingAge.push(json_pop[i].wAgeNumb);
				children.push(json_pop[i].childrenNumb);
				older.push(json_pop[i].olderPNumb);
				totPop.push(json_pop[i].totalPop);
			}
		}
		if (json_pop[i].Year == "2018") {
			var yr = json_pop[i].Year;
			var wAge = json_pop[i].wAgeNumb;
			var childrenz = json_pop[i].childrenNumb;
			var elderly = json_pop[i].olderPNumb;
			var totP = json_pop[i].totalPop;
			var wNamez = json_pop[i].WardName;
			wardsAll.push(wNamez);
			yearArrayAll.push(yr);
			workingAgeAll.push(wAge);
			childrenAll.push(childrenz);
			olderAll.push(elderly);
			totPopAll.push(totP);
		}
	});
	//make the population visual
	popChartJs(yearArray[0], yearArray[1], yearArray[2], yearArray[3], yearArray[4], yearArray[5], yearArray[6], totPop[0], totPop[1], totPop[2], totPop[3], totPop[4], totPop[5], totPop[6], workingAge[0], workingAge[1], workingAge[2], workingAge[3], workingAge[4], workingAge[5], workingAge[6], children[0], children[1], children[2], children[3], children[4], children[5], children[6], older[0], older[1], older[2], older[3], older[4], older[5], older[6]);
	var makeJSONarrpop = [];
	var d1Obj = new Object();
	var d2Obj = new Object();
	var d3Obj = new Object();
	var wardObj = new Object();
	var d1Holder = [];
	var d2Holder = [];
	var d3Holder = [];
	var wardHolder = [];
	//go through the array and split the data into singluar arrays
	for (xy = 0; xy < wardsAll.length; xy++) {
		d1Holder.push(workingAgeAll[xy]);
		d2Holder.push(childrenAll[xy]);
		d3Holder.push(olderAll[xy]);
		wardHolder.push(wardsAll[xy]);
	}
	//create the visual data and format
	var barChartData = {
		labels: wardHolder,
		datasets: [{
			label: 'Working age',
			backgroundColor: "#24252a",
			data: d1Holder
		}, {
			label: 'Children',
			backgroundColor: "#304e8e",
			data: d2Holder
		}, {
			label: 'Elderly',
			backgroundColor: "#007bff",
			data: d3Holder
		}]
	};
	//make the visual
	makeStacked("popBar", barChartData)
}
//getting zoopla housing information
function getZoopla(json_zoopla, ward) {
	var turnover = json_zoopla.zoopla.turnover;
	var currentSalepriceAvg = json_zoopla.zoopla.average_sold_price_1year;
	var currentSalesNumb = json_zoopla.zoopla.number_of_sales_1year;
	var yr3SalepriceAvg = json_zoopla.zoopla.average_sold_price_3year;
	var yr3SalesNumb = json_zoopla.zoopla.number_of_sales_3year;
	var yr5SalepriceAvg = json_zoopla.zoopla.average_sold_price_5year;
	var yr5SalesNumb = json_zoopla.zoopla.number_of_sales_5year;
	var yr7SalepriceAvg = json_zoopla.zoopla.average_sold_price_7year;
	var yr7SalesNumb = json_zoopla.zoopla.number_of_sales_7year;
	var postZoopla = json_zoopla.zoopla.postcode;
	//appending postcode housing data
	$(".wr").append(postZoopla);
	var numbComma = numberWithCommas(currentSalesNumb);
	$("#Sales").append(numbComma);
	$("#avgPaidPrice").append("£" + currentSalepriceAvg);
	//caluclating the averages
	var calculateIncDec = currentSalepriceAvg - yr3SalepriceAvg;
	var calculateIncDecProc = calculateIncDec / currentSalepriceAvg * 100;
	var text = "";
	//caluclate the increase/decrase between now and last 3 years
	if (calculateIncDec < 0) {
		text = "Decrease £";
		calculateIncDec = Math.abs(calculateIncDec);
		calculateIncDecProc = Math.abs(calculateIncDecProc);
		$("#valueChange").addClass("text-danger");
	} else {
		text = "Increase £";
		$("#valueChange").addClass("text-success");
	}
	calculateIncDec = numberWithCommas(calculateIncDec);
	$("#valueChange").append(text + calculateIncDec + " (" + "% " + Math.round(calculateIncDecProc * 100) / 100 + ")");
	//bristol data
	var turnoverBrs = json_zoopla.zoopla_brs.areas[0].turnover;
	var currentSalepriceAvgBrs = json_zoopla.zoopla_brs.areas[0].average_sold_price_1year;
	var currentSalesNumbBrs = json_zoopla.zoopla_brs.areas[0].number_of_sales_1year;
	var yr3SalepriceAvgBrs = json_zoopla.zoopla_brs.areas[0].average_sold_price_3year;
	var yr3SalesNumbBrs = json_zoopla.zoopla_brs.areas[0].number_of_sales_3year;
	var yr5SalepriceAvgBrs = json_zoopla.zoopla_brs.areas[0].average_sold_price_5year;
	var yr5SalesNumbBrs = json_zoopla.zoopla_brs.areas[0].number_of_sales_5year;
	var yr7SalepriceAvgBrs = json_zoopla.zoopla_brs.areas[0].average_sold_price_7year;
	var yr7SalesNumbBrs = json_zoopla.zoopla_brs.areas[0].number_of_sales_7year;
	//outcode data ie bs5
	var turnoverOutcode = json_zoopla.zoopla_outcode.turnover;
	var currentSalepriceAvgOutcode = json_zoopla.zoopla_outcode.average_sold_price_1year;
	var currentSalesNumbOutcode = json_zoopla.zoopla_outcode.number_of_sales_1year;
	var yr3SalepriceAvgOutcode = json_zoopla.zoopla_outcode.average_sold_price_3year;
	var yr3SalesNumbOutcode = json_zoopla.zoopla_outcode.number_of_sales_3year;
	var yr5SalepriceAvgOutcode = json_zoopla.zoopla_outcode.average_sold_price_5year;
	var yr5SalesNumbOutcode = json_zoopla.zoopla_outcode.number_of_sales_5year;
	var yr7SalepriceAvgOutcode = json_zoopla.zoopla_outcode.average_sold_price_7year;
	var yr7SalesNumbOutcode = json_zoopla.zoopla_outcode.number_of_sales_7year;
	var zooplaPostcodeOutCode = json_zoopla.zoopla_outcode.postcode;
	//appending outcode data
	$(".out").append(zooplaPostcodeOutCode);
	var numbCommaOutcode = numberWithCommas(currentSalesNumbOutcode);
	$("#SalesOut").append(numbCommaOutcode);
	$("#avgPaidPriceOut").append("£" + currentSalepriceAvgOutcode);
	//caluclating the averages
	var calculateIncDecOutcode = currentSalepriceAvgOutcode - yr3SalepriceAvgOutcode;
	var calculateIncDecProcOutcode = calculateIncDecOutcode / currentSalepriceAvgOutcode * 100;
	var calculateIncDecProcOutcode = Math.round(calculateIncDecProcOutcode * 100) / 100;
	var textOutcode = "";
	//caluclating the incrase/decrase in market value change in last 3 years
	if (calculateIncDecOutcode < 0) {
		textOutcode = "Decrease £";
		calculateIncDecOutcode = Math.abs(calculateIncDecOutcode);
		calculateIncDecProcOutcode = Math.abs(calculateIncDecProcOutcode);
		$("#valueChange").addClass("text-danger");
	} else {
		textOutcode = "Increase £";
		$("#valueChangeOut").addClass("text-success");
	}
	calculateIncDecOutcode = numberWithCommas(calculateIncDecOutcode);
	$("#valueChangeOut").append(textOutcode + calculateIncDecOutcode + " (" + "% " + calculateIncDecProcOutcode + ")");
	zooplaChartJS("1 Year", "3 Years", "5 Years", "7 Years", currentSalepriceAvg, yr3SalepriceAvg, yr5SalepriceAvg, yr7SalepriceAvg, currentSalepriceAvgBrs, yr3SalepriceAvgBrs, yr5SalepriceAvgBrs, yr7SalepriceAvgBrs, currentSalepriceAvgOutcode, yr3SalepriceAvgOutcode, yr5SalepriceAvgOutcode, yr7SalepriceAvgOutcode, postZoopla,zooplaPostcodeOutCode);
}
//getting housing data
function getHousing(json_housing, ward) {
	/*---------Housing Owned-----------------*/
	var totalHouseHoldsTenure = 0;
	var ownedProc = 0;
	var socialProc = 0;
	var privateProc = 0;
	var ownedNumb = 0;
	var socialNumb = 0;
	var privateNumb = 0;
	/*---------Housing Owned BRS-----------------*/
	var totalHouseHoldsTenureBRS = 0;
	var ownedProcBRS = 0;
	var socialProcBRS = 0;
	var privateProcBRS = 0;
	var ownedNumbBRS = 0;
	var socialNumbBRS = 0;
	var privateNumbBRS = 0;
	/*---------Housing Type-----------------*/
	var totHouseSpaces = 0;
	var semiProc = 0;
	var terracedProc = 0;
	var detachedProc = 0;
	var flat1Proc = 0;
	var flat2Proc = 0;
	var flat3Proc = 0;
	var flatProc = 0;
	var otherProc = 0;
	var semiNumb = 0;
	var terracedNumb = 0;
	var detachedNumb = 0;
	var flat1Numb = 0;
	var flat2Numb = 0;
	var flat3Numb = 0;
	var flatNumb = 0;
	var otherNumb = 0;
	/*---------Housing type BRS-----------------*/
	var totHouseSpacesBRS = 0;
	var semiProcBRS = 0;
	var terracedProcBRS = 0;
	var detachedProcBRS = 0;
	var flat1ProcBRS = 0;
	var flat2ProcBRS = 0;
	var flat3ProcBRS = 0;
	var flatProcBRS = 0;
	var otherProcBRS = 0;
	var semiNumbBRS = 0;
	var terracedNumbBRS = 0;
	var detachedNumbBRS = 0;
	var flat1NumbBRS = 0;
	var flat2NumbBRS = 0;
	var flat3NumbBRS = 0;
	var flatNumbBRS = 0;
	var otherNumbBRS = 0;
	/*---------Housing BED-----------------*/
	var totalHouseholdsBed = 0;
	var oneBedProc = 0;
	var twoBedProc = 0;
	var threeBedProc = 0;
	var fourPlusBedProc = 0;
	var oneBedNumb = 0;
	var twoBedNumb = 0;
	var threeBedNumb = 0;
	var fourPlusBedNumb = 0;
	var overcrowdedHousesProc = 0;
	var overcrowdedHousesNumb = 0;
	var avgBedPerHouse = 0;
	var avgHouseSizePerPerson = 0;
	/*---------Housing BED BRS----------------*/
	var totalHouseholdsBedBrs = 0;
	var oneBedProcBrs = 0;
	var twoBedProcBrs = 0;
	var threeBedProcBrs = 0;
	var fourPlusBedProcBrs = 0;
	var oneBedNumbBrs = 0;
	var twoBedNumbBrs = 0;
	var threeBedNumbBrs = 0;
	var fourPlusBedNumbBrs = 0;
	var overcrowdedHousesProcBrs = 0;
	var overcrowdedHousesNumbBrs = 0;
	var avgBedPerHouseBrs = 0;
	var avgHouseSizePerPersonBrs = 0;
	var counter = 0;
	//for each wards housing size data
	$.each(json_housing.housing_size.records, function(i) {
		//if it is the current ward grab the needed data  
		if (json_housing.housing_size.records[i].record.fields["2016_ward_name"] == ward) {
			totalHouseholdsBed = json_housing.housing_size.records[i].record.fields.total_number_of_households;
			oneBedProc = json_housing.housing_size.records[i].record.fields.with_1_bedroom;
			twoBedProc = json_housing.housing_size.records[i].record.fields.with_2_bedrooms;
			threeBedProc = json_housing.housing_size.records[i].record.fields.with_3_bedrooms;
			fourPlusBedProc = json_housing.housing_size.records[i].record.fields.with_4_or_more_bedrooms;
			oneBedNumb = json_housing.housing_size.records[i].record.fields["1_bedroom_household"];
			twoBedNumb = json_housing.housing_size.records[i].record.fields["2_bedroom_household"];
			threeBedNumb = json_housing.housing_size.records[i].record.fields["3_bedroom_household"];
			fourPlusBedNumb = json_housing.housing_size.records[i].record.fields["4_or_more_bedroom_household"];
			overcrowdedHousesProc = json_housing.housing_size.records[i].record.fields.overcrowded_households_ie_occupancy_rating_bedrooms_of_1_or_less0;
			overcrowdedHousesNumb = json_housing.housing_size.records[i].record.fields.overcrowded_households_ie_occupancy_rating_bedrooms_of_1_or_less;
			avgBedPerHouse = json_housing.housing_size.records[i].record.fields.average_number_of_bedrooms_per_household;
			avgHouseSizePerPerson = json_housing.housing_size.records[i].record.fields.average_household_size_persons_per_household;
		}
		//otherwise for all other wards record this data
		totalHouseholdsBedBrs = totalHouseholdsBedBrs + json_housing.housing_size.records[i].record.fields.total_number_of_households;
		oneBedProcBrs = oneBedProcBrs + json_housing.housing_size.records[i].record.fields.with_1_bedroom;
		twoBedProcBrs = twoBedProcBrs + json_housing.housing_size.records[i].record.fields.with_2_bedrooms;
		threeBedProcBrs = threeBedProcBrs + json_housing.housing_size.records[i].record.fields.with_3_bedrooms;
		fourPlusBedProcBrs = fourPlusBedProcBrs + json_housing.housing_size.records[i].record.fields.with_4_or_more_bedrooms;
		oneBedNumbBrs = oneBedNumbBrs + json_housing.housing_size.records[i].record.fields["1_bedroom_household"];
		twoBedNumbBrs = twoBedNumbBrs + json_housing.housing_size.records[i].record.fields["2_bedroom_household"];
		threeBedNumbBrs = threeBedNumbBrs + json_housing.housing_size.records[i].record.fields["3_bedroom_household"];
		fourPlusBedNumbBrs = fourPlusBedNumbBrs + json_housing.housing_size.records[i].record.fields["4_or_more_bedroom_household"];
		overcrowdedHousesProcBrs = overcrowdedHousesProcBrs + json_housing.housing_size.records[i].record.fields.overcrowded_households_ie_occupancy_rating_bedrooms_of_1_or_less0;
		overcrowdedHousesNumbBrs = overcrowdedHousesNumbBrs + json_housing.housing_size.records[i].record.fields.overcrowded_households_ie_occupancy_rating_bedrooms_of_1_or_less;
		avgBedPerHouseBrs = avgBedPerHouseBrs + json_housing.housing_size.records[i].record.fields.average_number_of_bedrooms_per_household;
		avgHouseSizePerPersonBrs = avgHouseSizePerPersonBrs + json_housing.housing_size.records[i].record.fields.average_household_size_persons_per_household;
		counter++;
	});
	//for each wards housing type data  
	$.each(json_housing.housing_type.records, function(i) {
		//if it is the current ward grab the following data
		if (json_housing.housing_type.records[i].record.fields["2016_ward_name"] == ward) {
			semiProc = json_housing.housing_type.records[i].record.fields.semi_detached0;
			terracedProc = json_housing.housing_type.records[i].record.fields.terraced0;
			detachedProc = json_housing.housing_type.records[i].record.fields.detached0;
			//add flats up ass the flats are caluclated togehter
			flat1Proc = json_housing.housing_type.records[i].record.fields.flat_in_commercial_building0;
			flat2Proc = json_housing.housing_type.records[i].record.fields.flat_part_of_a_converted_or_shared_house_including_bed_sits0;
			flat3Proc = json_housing.housing_type.records[i].record.fields.flat_purpose_built_block_of_flats0;
			flatProc = flat1Proc + flat2Proc + flat3Proc;
			otherProc = json_housing.housing_type.records[i].record.fields.caravan_or_other_mobile_or_temporary_structure0;
			semiNumb = json_housing.housing_type.records[i].record.fields.semi_detached;
			terracedNumb = parseInt(json_housing.housing_type.records[i].record.fields.terraced);
			detachedNumb = json_housing.housing_type.records[i].record.fields.detached;
			flat1Numb = json_housing.housing_type.records[i].record.fields.flat_in_commercial_building;
			flat2Numb = json_housing.housing_type.records[i].record.fields.flat_part_of_a_converted_or_shared_house_including_bed_sits;
			flat3Numb = json_housing.housing_type.records[i].record.fields.flat_purpose_built_block_of_flats;
			flatNumb = flat1Numb + flat2Numb + flat3Numb;
			otherNumb = json_housing.housing_type.records[i].record.fields.caravan_or_other_mobile_or_temporary_structure;
			/*spaced not actual numb*/
			totHouseSpaces = json_housing.housing_type.records[i].record.fields.total_number_of_household_spaces;
		}
		//for all other wards grab this data  
		semiProcBRS = semiProcBRS + json_housing.housing_type.records[i].record.fields.semi_detached0;
		terracedProcBRS = terracedProcBRS + json_housing.housing_type.records[i].record.fields.terraced0;
		detachedProcBRS = detachedProcBRS + json_housing.housing_type.records[i].record.fields.detached0;
		//add flats up ass the flats are caluclated togheter
		flat1ProcBRS = flat1ProcBRS + json_housing.housing_type.records[i].record.fields.flat_in_commercial_building0;
		flat2ProcBRS = flat2ProcBRS + json_housing.housing_type.records[i].record.fields.flat_part_of_a_converted_or_shared_house_including_bed_sits0;
		flat3ProcBRS = flat3ProcBRS + json_housing.housing_type.records[i].record.fields.flat_purpose_built_block_of_flats0;
		flatProcBRS = flat1ProcBRS + flat2ProcBRS + flat3ProcBRS;
		otherProcBRS = otherProcBRS + json_housing.housing_type.records[i].record.fields.caravan_or_other_mobile_or_temporary_structure0;
		semiNumbBRS = semiNumbBRS + json_housing.housing_type.records[i].record.fields.semi_detached;
		terracedNumbBRS = terracedNumbBRS + parseInt(json_housing.housing_type.records[i].record.fields.terraced);
		detachedNumbBRS = detachedNumbBRS + json_housing.housing_type.records[i].record.fields.detached;
		flat1NumbBRS = flat1NumbBRS + json_housing.housing_type.records[i].record.fields.flat_in_commercial_building;
		flat2NumbBRS = flat2NumbBRS + json_housing.housing_type.records[i].record.fields.flat_part_of_a_converted_or_shared_house_including_bed_sits;
		flat3NumbBRS = flat3NumbBRS + parseInt(json_housing.housing_type.records[i].record.fields.flat_purpose_built_block_of_flats);
		otherNumbBRS = otherNumbBRS + json_housing.housing_type.records[i].record.fields.caravan_or_other_mobile_or_temporary_structure;
		/*spaced not actual numb*/
		totHouseSpacesBRS = totHouseSpacesBRS + json_housing.housing_type.records[i].record.fields.total_number_of_household_spaces;
	});
	flatNumbBRS = flat1NumbBRS + flat2NumbBRS + flat3NumbBRS;
	//for each wards tenure data
	$.each(json_housing.housing_tenure.records, function(i) {
		//if this ward get the following data
		if (json_housing.housing_tenure.records[i].record.fields["2016_ward_name"] == ward) {
			totalHouseHoldsTenure = json_housing.housing_tenure.records[i].record.fields.total_number_of_households;
			ownedProc = json_housing.housing_tenure.records[i].record.fields.owned0;
			socialProc = json_housing.housing_tenure.records[i].record.fields.social_rented0;
			privateProc = json_housing.housing_tenure.records[i].record.fields.private_and_other_rented0;
			ownedNumb = json_housing.housing_tenure.records[i].record.fields.owned;
			socialNumb = json_housing.housing_tenure.records[i].record.fields.social_rented;
			privateNumb = json_housing.housing_tenure.records[i].record.fields.private_and_other_rented;
		}
		//for all other wards get the following data
		totalHouseHoldsTenureBRS = totalHouseHoldsTenureBRS + json_housing.housing_tenure.records[i].record.fields.total_number_of_households;
		ownedProcBRS = ownedProcBRS + json_housing.housing_tenure.records[i].record.fields.owned0;
		socialProcBRS = socialProcBRS + json_housing.housing_tenure.records[i].record.fields.social_rented0;
		privateProcBRS = privateProcBRS + json_housing.housing_tenure.records[i].record.fields.private_and_other_rented0;
		ownedNumbBRS = ownedNumbBRS + json_housing.housing_tenure.records[i].record.fields.owned;
		socialNumbBRS = socialNumbBRS + json_housing.housing_tenure.records[i].record.fields.social_rented;
		privateNumbBRS = privateNumbBRS + json_housing.housing_tenure.records[i].record.fields.private_and_other_rented;
	});
	//make housing visuals from the data 
	housing_ownedPieChartJS("housing_ownedPieChart", "Owned", "Social", "Private owned", ownedProc, socialProc, privateProc);
	housing_typePieChartJS("housing_typePieChart", "Semi", "Terraced", "Detached", "Flat", semiProc, terracedProc, detachedProc, flatProc);
	housing_bedPieChartJS("housing_bedPieChart", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4+ Bedroom", oneBedProc, twoBedProc, threeBedProc, fourPlusBedProc);
	//calculate the averages for the data 
	var calcAVG_owned_Brs = oneDcm(ownedNumbBRS / totalHouseHoldsTenureBRS * 100);
	var calcAVG_social_Brs = oneDcm(socialNumbBRS / totalHouseHoldsTenureBRS * 100);
	var calcAVG_privateBrs = oneDcm(privateNumbBRS / totalHouseHoldsTenureBRS * 100);
	var calcAVG_semi_Brs = oneDcm(semiNumbBRS / totHouseSpacesBRS * 100);
	var calcAVG_terraced_Brs = oneDcm(terracedNumbBRS / totHouseSpacesBRS * 100);
	var calcAVG_detached_Brs = oneDcm(detachedNumbBRS / totHouseSpacesBRS * 100);
	var calcAVG_flat_Brs = oneDcm(flatNumbBRS / totHouseSpacesBRS * 100);
	var calcAVG_Bed_1_Brs = oneDcm(oneBedNumbBrs / totalHouseholdsBedBrs * 100);
	var calcAVG_Bed_2_Brs = oneDcm(twoBedNumbBrs / totalHouseholdsBedBrs * 100);
	var calcAVG_Bed_3_Brs = oneDcm(threeBedNumbBrs / totalHouseholdsBedBrs * 100);
	var calcAVG_Bed_4_Brs = oneDcm(fourPlusBedProcBrs / totalHouseholdsBedBrs * 100);
	//create visuals from the data
	housing_ownedPieChartJS("housing_ownedPieChartBRS", "Owned", "Social", "Private owned", calcAVG_owned_Brs, calcAVG_social_Brs, calcAVG_privateBrs);
	housing_typePieChartJS("housing_typePieChartBRS", "Semi", "Terraced", "Detached", "Flat", calcAVG_semi_Brs, calcAVG_terraced_Brs, calcAVG_detached_Brs, calcAVG_flat_Brs);
	housing_bedPieChartJS("housing_bedPieChartBRS", "1 Bedroom", "2 Bedroom", "3 Bedroom", "4+ Bedroom", calcAVG_Bed_1_Brs, calcAVG_Bed_2_Brs, calcAVG_Bed_3_Brs, calcAVG_Bed_4_Brs);
	//make colour coding for housing
	var checkHousing = colourCoding(totalHouseholdsBed, totalHouseholdsBedBrs);
	housing_totalPieChartJS("totalHouseBRS", "Bristol", totalHouseholdsBedBrs, "default");
	housing_totalPieChartJS("totalHouseWard", ward, totalHouseholdsBed, checkHousing);
}
//get user review data
function getUserReview(json_review) {
	var recordResponse = [];
	var questionArr = [];
	var tempArray = [];
	var tempArray2 = [];
	var tempArray3 = [];
	tempArray.push(json_review.review[0].q1Yes, json_review.review[0].q1No);
	recordResponse.push(tempArray);
	tempArray2.push(json_review.review[0].q2Yes, json_review.review[0].q2No);
	recordResponse.push(tempArray2);
	tempArray3.push(json_review.review[0].q3Yes, json_review.review[0].q3No);
	recordResponse.push(tempArray3);
	//grab all the questions
	$.each(json_review.question, function(i) {
		var tempArray = [];
		tempArray.push(json_review.question[i].Question);
		questionArr.push(tempArray);
	});
	//go through each response yes or no and make data out of it
	var makePlainDonutJson = [];
	for (xy = 0; xy < recordResponse.length; xy++) {
		var someObj = new Object();
		someObj.label = questionArr[xy];
		someObj.data = [recordResponse[xy][0], recordResponse[xy][1]];
		someObj.backgroundColor = ["green", "red"]
		makePlainDonutJson.push(someObj);
	}
	testarr = [];
	testarr.push(makePlainDonutJson[0]);
	testarr2 = [];
	testarr2.push(makePlainDonutJson[1]);
	testarr3 = [];
	testarr3.push(makePlainDonutJson[2]);
	//mak visual
	plainDonut("userDrivenChart", questionArr[0], testarr);
	plainDonut("userDrivenChart1", questionArr[1], testarr2);
	plainDonut("userDrivenChart2", questionArr[2], testarr3);
}