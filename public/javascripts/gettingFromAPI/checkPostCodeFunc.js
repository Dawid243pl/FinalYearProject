function getCrime(json_crime){

      var newJsonArrayWrd =[];
      var newJsonArrayBrs =[];
   

      
  //    console.log("Crime json",json_crime);

    //  console.log("Crime json",json_crime[0].bulgary);

/*
      var crimeStat1 = new Object();
      crimeStat1.name = "Bulglary";
      crimeStat1.percent = json_crime[0].bulgary;
  
      var crimeStat2 = new Object();
      crimeStat2.name = "Sexual Offence";
      crimeStat2.percent = json_crime[0].sexOffence;
*/
$.each(json_crime, function(i){


  if( json_crime[i].WardName ==ward){
      var crimeStat3 = new Object();
      crimeStat3.name = "Total crimes";
      crimeStat3.percent = 100;
      crimeStat3.actual =  numberWithCommas(json_crime[i].totalCrimes);;
      crimeStat3.wName = json_crime[i].WardName;
  
      
      newJsonArrayWrd.push(crimeStat3);
  
      makeDonut(newJsonArrayWrd,chartWrd,"colour");
  }
  
  if( json_crime[i].WardName =="Bristol"){
      var crimeStat1 = new Object();
      crimeStat1.name = "Total crimes";
      crimeStat1.percent = 100;
      crimeStat1.actual =  numberWithCommas(json_crime[i].totalCrimes);;
      crimeStat1.wName = json_crime[i].WardName;
  
     
      newJsonArrayBrs.push(crimeStat1);
  
      makeDonut(newJsonArrayBrs,chartBrs,"colour");
  }
      //makeDonut(newJsonArrayBrs);
      
      /*
      $(".CrimeComponent").append(json_crime[0].bulgary+"<br>");
      $(".CrimeComponent").append(json_crime[0].sexOffence+"<br>");
      $(".CrimeComponent").append(json_crime[0].totalCrimes+"<br>");
      $(".CrimeComponent").append(json_crime[0].population+"<br>");
    */
  });
      
  }

function getQuallity(json_quall){
  
 

  $.each(json_quall, function(i){
    //console.log("Quallity Crime json",json_quall[i]);

    console.log(json_quall[i].Indicator);
    console.log(json_quall[i].Total);

   
    $(".list-group").append("<li class='my-list list-group-item d-flex justify-content-between align-items-center'>% "+json_quall[i].Indicator+"<span class='badge badge-primary badge-pill'>"+json_quall[i].Total+"</span></div>");

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
