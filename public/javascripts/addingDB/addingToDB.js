/*This file is used for gathering all of the data from the APIs and putting it inside the database*/
$(function() {
	navigator.geolocation.getCurrentPosition(async position => {
		try {
			//get Postcode API DETAILS
			var wardArray = [];
			const api_url = `postCode/bs57tw`;
			const response = await fetch(api_url);
			const json = await response.json();
			postC = json.postcode.result.postcode;
			lat = json.postcode.result.latitude;
			long = json.postcode.result.longitude;
			easting = json.postcode.result.eastings;
			northing = json.postcode.result.northings;
			ward = json.postcode.result.admin_ward;
			//grab the list of all wards           
			const api_url_ward = `listWards`;
			const response_ward = await fetch(api_url_ward);
			const json_ward = await response_ward.json();
			$.each(json_ward.wards.records, function(i) {
				var wrd = json_ward.wards.records[i].record.fields.name;
				wardArray.push(wrd);
			});
			//go through each of the wards and get the quallity of life data for each ward
			for (var i = 0; i < wardArray.length; i++) {
				wardArray[i] = wardArray[i].replace(" & ", "+%26+");
				const api_url_quall = `Quallity/${wardArray[i]}`;
				const response_quall = await fetch(api_url_quall);
				const json_quall = await response_quall.json();
				getQuallity(json_quall);
			}
			const api_url_crime = `crimes/${ward}`;
			const response_crime = await fetch(api_url_crime);
			const json_crime = await response_crime.json();
			const api_url_pop = `population`;
			const response_pop = await fetch(api_url_pop);
			const json_pop = await response_pop.json();
			const api_url_wards = `listWards`;
			const response_wards = await fetch(api_url_wards);
			const json_wards = await response_wards.json();
			//futherly parse the json in each function and alert when the scritp is finished.
			getCrime(json_crime);
			getPopulation(json_pop);
			getWard(json_wards);
			alert("Adding to db Finished");
		} catch (error) {
			console.error(error);
		}
	});
});