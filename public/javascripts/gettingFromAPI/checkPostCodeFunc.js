function getCrime(json_crime){
    tempArray = [];
    $.each(json_crime, function(i){

      
      console.log("Crime json",json_crime);


      //console.log("k",json_crime.all_wards.records[i]);

      //console.log(json_crime.all_wards.records[i].record.fields.burglary_number);


      //var bulg = json_crime.all_wards.records[i].record.fields.burglary_number;
      //var sex = json_crime.all_wards.records[i].record.fields.violent_sexual_offences_number;
      //var all = json_crime.all_wards.records[i].record.fields.all_crimes_number;
      //var pop = json_crime.all_wards.records[i].record.fields.latest_mid_year_population_estimates_for_ward;
      //var wrd = json_crime.all_wards.records[i].record.fields.ward_name;


    
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
    
    
  }

function getQuallity(json_quall){
  
    $.each(json_quall, function(i){

      
      console.log("Quallity Crime json",json_quall);

    }); 
    
    
  }
  function getEdu(json_edu){
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

  function getWeather(json_weather){

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
