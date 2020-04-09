  /*This file holds all of the function definitions that are used to add the data collected from the API to the database*/
  //Add crime to db
  async function addCrimeToDb(ward, year, bulglary, sexOffence, allCrimes, totalPop) {
  	try {
  		let response = await fetch(`crime_create/${ward}/${year}/${bulglary}/${sexOffence}/${allCrimes}/${totalPop}`);
  		//return await response.json();
  	} catch (err) {
  		console.error(err);
  		// Handle errors here
  	}
  }
  //Add Quallity of life data to db
  async function addquallityOfLifeToDb(ward, indicator, theme, total) {
  	console.log("see this", ward, indicator, theme, total);
  	try {
  		let response = await fetch(`quallity_create/${ward}/${indicator}/${theme}/${total}`);
  		//return await response.json();
  	} catch (err) {
  		console.error(err);
  		// Handle errors here
  	}
  }
  //Add Population data to db
  async function addPopulationToDb(ward, year, workingAgeP, olderPP, childrenP, workingAgeN, olderPN, childrenN, totalPop) {
  	try {
  		let response = await fetch(`population_create/${ward}/${year}/${workingAgeP}/${olderPP}/${childrenP}/${workingAgeN}/${olderPN}/${childrenN}/${totalPop}`);
  		//return await response.json();
  	} catch (err) {
  		console.error(err);
  		// Handle errors here
  	}
  }
  //Add the list of wards to db
  async function addWardsToDb(ward) {
  	try {
  		let response = await fetch(`ward_create/${ward}`);
  		//return await response.json();
  	} catch (err) {
  		console.error(err);
  		// Handle errors here
  	}
  }