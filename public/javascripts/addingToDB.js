
$(function(){


    navigator.geolocation.getCurrentPosition(async position => {

      try {
        //get Postcode API DETAILS
        const api_url = `postCode/bs57tw`;
        const response = await fetch(api_url);
        const json = await response.json();

        //weather = json.weather.currently;
        //air = json.air_quality.results[0].measurements[0];

        postC =  json.postcode.result.postcode;
        lat = json.postcode.result.latitude;
        long = json.postcode.result.longitude;
        easting = json.postcode.result.eastings;
        northing = json.postcode.result.northings;
        ward = json.postcode.result.admin_ward;

        
        const api_url_crime = `crimes/${ward}`;
        const response_crime = await fetch(api_url_crime);
        const json_crime = await response_crime.json();


        const api_url_edu = `education/${ward}`;
        const response_edu = await fetch(api_url_edu);
        const json_edu = await response_edu.json();

        const api_url_quall = `Quallity/${ward}`;
        const response_quall = await fetch(api_url_quall );
        const json_quall  = await response_quall.json();

    



      //getQuallity(json_quall);
      //getEdu(json_edu);
      getQuallity(json_quall);
      getCrime(json_crime);

      } 
      catch (error) {
        console.error(error);

      }

});
  

});