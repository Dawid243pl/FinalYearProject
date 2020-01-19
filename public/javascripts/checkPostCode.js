
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


        const api_url_crime = `crimes/${ward}`;
        const response_crime = await fetch(api_url_crime);
        const json_crime = await response_crime.json();

        //console.log("burglary number",json_crime.Current_ward);
        var mainArray=[];    
        function getCrime(){
        tempArray = [];
        $.each(json_crime.all_wards.records, function(i){

          
          console.log("all json",json_crime.all_wards.records);
          //console.log("k",json_crime.all_wards.records[i]);

          //console.log(json_crime.all_wards.records[i].record.fields.burglary_number);


          var bulg = json_crime.all_wards.records[i].record.fields.burglary_number;
          var sex = json_crime.all_wards.records[i].record.fields.violent_sexual_offences_number;
          var all = json_crime.all_wards.records[i].record.fields.all_crimes_number;
          var pop = json_crime.all_wards.records[i].record.fields.latest_mid_year_population_estimates_for_ward;
          var wrd = json_crime.all_wards.records[i].record.fields.ward_name;


          addToDB(wrd,bulg,sex,all,pop);
          /*
          //console.log(json_crime.Current_ward.field.burglary_number);
          //console.log("kv",k,v);
          //console.log(v.fields.year);
          //console.log(v.fields.burglary_number);
          //if (v.fields.year === "2018/19"){
            console.log("burglary",v.fields.burglary_number);
            console.log("sexual offences",v.fields.violent_sexual_offences_number);
            console.log("total crimes",v.fields.all_crimes_number);
            console.log("total population",v.fields.latest_mid_year_population_estimates_for_ward);
            var bulg = v.fields.burglary_number;
            var sex = v.fields.violent_sexual_offences_number;
            var all = v.fields.all_crimes_number;
            var pop = v.fields.latest_mid_year_population_estimates_for_ward;
            var wrd = v.fields.ward_name;

          
            //$('#testDiv').append(bulg);
            //var tempArr=[];
            //tempArr.push(wrd,bulg,sex,all,pop);
            ///crime_create/:wardName/:bulglary/:sexualOffence/:AllCrimes/:totalPop
            addToDB(wrd,bulg,sex,all,pop);
    
            //tempArray.push(tempArr);
          }
*/

        }); 
        
        console.log(tempArray);
      }



      const api_url_weather = `weather/${lat}/${long}`;
      const response_weather = await fetch(api_url_weather);
      const json_weather = await response_weather.json();
      function getWeather(){

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
      }

   

      const api_url_edu = `education/${ward}`;
      const response_edu = await fetch(api_url_edu);
      const json_edu = await response_edu.json();

        
      function getEdu(){
        tempArray = [];
        $.each(json_edu.Current_ward.records, function(k, v){
         
          if (v.fields.time_period === "2018/2019"){
            console.log("good devo",v.fields.achieving_a_good_level_of_development);
         
            var devo = v.fields.achieving_a_good_level_of_development;
      
            tempArray.push(devo);
          }


        }); 
        console.log(tempArray);

      };

      
      const api_url_quall = `Quallity/${ward}`;
      const response_quall = await fetch(api_url_quall );
      const json_quall  = await response_quall.json();



      function getQuallity(){
        tempArray = [];
        $.each(json_quall.health.records, function(k, v){
         
         
            console.log("indicator",v.fields.indicator,"avg score",avgTwoNumb(v.fields.upper_confidence_limit,v.fields.lower_confidence_limit));

           
          
         
            //var devo = v.fields.achieving_a_good_level_of_development;
      
            //tempArray.push(devo);
          
        }); 
        console.log(tempArray);

      };
      //keep calling the databse in loop to insret all records?
      // const api_url_database = `Quallity/${ward}`;
      //const response_database = await fetch(api_url_quall );


      //getQuallity();
      getEdu();
      getWeather();
      getCrime();







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

  ///crime_create/:wardName/:bulglary/:sexualOffence/:AllCrimes/:totalPop


  async function addToDB(ward,bulglary,sexOffence,allCrimes,totalPop)  {
    try{
      let response = await fetch(`crime_create/${ward}/${bulglary}/${sexOffence}/${allCrimes}/${totalPop}`);
      //return await response.json();
    }catch(err){
      console.error(err);
      // Handle errors here
    }
  }


});