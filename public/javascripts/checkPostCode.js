
$(function(){


    navigator.geolocation.getCurrentPosition(async position => {

      try {
        const api_url = `postCode/${postcode}`;
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


        const api_url_crime = `listCrime/${ward}`;
        const response_crime = await fetch(api_url_crime);
        const json_crime = await response_crime.json();
   

        const api_url_weather = `weather/${lat}/${long}`;
        const response_weather = await fetch(api_url_weather);
        const json_weather = await response_weather.json();
      
        const api_url_edu = `education/${ward}`;
        const response_edu = await fetch(api_url_edu);
        const json_edu = await response_edu.json();

      
        const api_url_quall = `ListQuallity/${ward}`;
        const response_quall = await fetch(api_url_quall );
        const json_quall  = await response_quall.json();


/*
      function getQuallity(){
        tempArray = [];
        $.each(json_quall.health.records, function(k, v){
         
         
            console.log("indicator",v.fields.indicator,"avg score",avgTwoNumb(v.fields.upper_confidence_limit,v.fields.lower_confidence_limit));

           
          
         
            //var devo = v.fields.achieving_a_good_level_of_development;
      
            //tempArray.push(devo);
          
        }); 
        console.log(tempArray);

      };
      */
      getQuallity(json_quall);
      getEdu(json_edu);
      getWeather(json_weather);
      getCrime(json_crime);

      } 
      catch (error) {
        console.error(error);
        air = { value: -1 };
        document.getElementById('aq_value').textContent = 'NO READING';
      }

      /*
      const data = { lat, lon, weather, air };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const db_response = await fetch('/api', options);
      const db_json = await db_response.json();
      console.log(db_json);
      */
});




});