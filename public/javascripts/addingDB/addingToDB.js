
$(function(){


    navigator.geolocation.getCurrentPosition(async position => {

      try {
        //get Postcode API DETAILS
        var wardArray =[];

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

        
        const api_url_ward = `listWards`;
        const response_ward = await fetch(api_url_ward);
        const json_ward = await response_ward.json();

        
        $.each(json_ward.wards.records, function(i){

          
          var wrd = json_ward.wards.records[i].record.fields.name;

          wardArray.push(wrd);

        });

        console.log(wardArray);

        for (var i=0;i < wardArray.length;i++){

          console.log("loop",i,"wardName:",wardArray[i]);
          
          //Hotwells+%26+Harbourside;
          //wardArray[i] = wardArray[i].replace(' & ','+%26+');
         
          //console.log("normal",wardArray[i],"decoded",decodeURIComponent(wardArray[i]));

          wardArray[i] = wardArray[i].replace(" & ","+%26+");
          console.log("normal",wardArray[i]);

          //console.log("Changed array name Hotwells+%26+Harbourside compare",wardArray[i]);
          const api_url_quall = `Quallity/${wardArray[i]}`;
          console.log(api_url_quall);
          const response_quall = await fetch(api_url_quall );
          const json_quall  = await response_quall.json();
  
          getQuallity(json_quall);
        }

        
        const api_url_crime = `crimes/${ward}`;
        const response_crime = await fetch(api_url_crime);
        const json_crime = await response_crime.json();

        const api_url_pop = `population`;
        const response_pop = await fetch(api_url_pop);
        const json_pop = await response_pop.json();
        
        getCrime(json_crime);
        getPopulation(json_pop);

        alert("Adding to db Finished")

      } 
      catch (error) {
        console.error(error);

      }

});
  

});