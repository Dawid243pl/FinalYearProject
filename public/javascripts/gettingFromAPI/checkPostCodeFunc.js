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
var chartJsArray=[];
$.each(json_crime, function(i){
  
  //console.log(js)
  if( (json_crime[i].WardName ==ward) && (json_crime[i].year =="2018-19") ){

      var pop = json_crime[i].population;
      $(".popWrd").append("<h1>"+pop+"</h1>");   

      var crimeStat3 = new Object();
      crimeStat3.name = "Total crimes";
      crimeStat3.percent = 100;
      crimeStat3.actual =  numberWithCommas(json_crime[i].totalCrimes);
      crimeStat3.wName = json_crime[i].WardName;
  
      var trendYears = json_crime[i].year;
      var stat =  json_crime[i].totalCrimes;

      newJsonArrayWrd.push(crimeStat3);

      chartJsArray.push(trendYears,stat);

      makeDonut(newJsonArrayWrd,chartWrd,"colour");
  }
  if( (json_crime[i].WardName ==ward) && (json_crime[i].year =="2017-18") ){
    
    var trendYears = json_crime[i].year;
    var stat =  json_crime[i].totalCrimes;

    chartJsArray.push(trendYears,stat);
}
if( (json_crime[i].WardName ==ward) && (json_crime[i].year =="2016-17") ){

  var trendYears = json_crime[i].year;
  var stat =  json_crime[i].totalCrimes;

  chartJsArray.push(trendYears,stat);
 
}
  
  if( (json_crime[i].WardName =="Bristol") && (json_crime[i].year =="2018-19") ){
    
      var pop = json_crime[i].population;
      $(".popBrs").append("<h1>"+pop+"</h1>");   
      var crimeStat1 = new Object();
      crimeStat1.name = "Total crimes";
      crimeStat1.percent = 100;
      crimeStat1.actual =  numberWithCommas(json_crime[i].totalCrimes);
      crimeStat1.wName = json_crime[i].WardName;
  
     
      newJsonArrayBrs.push(crimeStat1);
  
      makeDonut(newJsonArrayBrs,chartBrs,"colour");
  }

  



  //makeChartJsCrime();


  //makeDonut(newJsonArrayBrs);
      
      /*
      $(".CrimeComponent").append(json_crime[0].bulgary+"<br>");
      $(".CrimeComponent").append(json_crime[0].sexOffence+"<br>");
      $(".CrimeComponent").append(json_crime[0].totalCrimes+"<br>");
      $(".CrimeComponent").append(json_crime[0].population+"<br>");
    */
  });
  
  makeChartJsCrime(chartJsArray[0],chartJsArray[2],chartJsArray[4],chartJsArray[1],chartJsArray[3],chartJsArray[5]);
  }

function getQuallity(json_quall){
  
 

  $.each(json_quall, function(i){
    //console.log("Quallity Crime json",json_quall[i]);

    //console.log(json_quall[i].Indicator);
    //console.log(json_quall[i].Total);

   
    $(".list-group").append("<li class='my-list list-group-item d-flex justify-content-between align-items-center'>% "+json_quall[i].Indicator+"<span class='badge badge-primary badge-pill'>"+json_quall[i].Total+"</span></div>");

  });
  
  }
  function getEdu(json_edu){
    tempArray = [];
    $.each(json_edu.Current_ward.records, function(k, v){
     
      if (v.fields.time_period === "2018/2019"){
        //console.log("good devo",v.fields.achieving_a_good_level_of_development);
     
        var devo = v.fields.achieving_a_good_level_of_development;
  
        tempArray.push(devo);
      }


    }); 
    console.log(tempArray);

  };

  function getWeather(json_weather){
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

  function getPopulation(json_pop){
  
    //var brsAvg
    var yearArray =[];
    var workingAge =[];
    var children =[];
    var older =[];
    var totPop =[];

    $.each(json_pop, function(i){

      if(json_pop[i].WardName ==ward){
        if(json_pop[i].Year == "2018"){

          yearArray.push(json_pop[i].Year);
          workingAge.push(json_pop[i].wAgeNumb);
          children.push(json_pop[i].childrenNumb);
          older.push(json_pop[i].olderPNumb);
          totPop.push(json_pop[i].totalPop);
        }
        if(json_pop[i].Year == "2017"){
          yearArray.push(json_pop[i].Year);
          workingAge.push(json_pop[i].wAgeNumb);
          children.push(json_pop[i].childrenNumb);
          older.push(json_pop[i].olderPNumb);
          totPop.push(json_pop[i].totalPop);
  
        }
        if(json_pop[i].Year == "2016"){
          yearArray.push(json_pop[i].Year);
          workingAge.push(json_pop[i].wAgeNumb);
          children.push(json_pop[i].childrenNumb);
          older.push(json_pop[i].olderPNumb);
          totPop.push(json_pop[i].totalPop);
  
        }
        if(json_pop[i].Year == "2015"){
          yearArray.push(json_pop[i].Year);
          workingAge.push(json_pop[i].wAgeNumb);
          children.push(json_pop[i].childrenNumb);
          older.push(json_pop[i].olderPNumb);
          totPop.push(json_pop[i].totalPop);
        }
        if(json_pop[i].Year == "2014"){
          yearArray.push(json_pop[i].Year);
          workingAge.push(json_pop[i].wAgeNumb);
          children.push(json_pop[i].childrenNumb);
          older.push(json_pop[i].olderPNumb);
          totPop.push(json_pop[i].totalPop);
        }
        if(json_pop[i].Year == "2013"){
          yearArray.push(json_pop[i].Year);
          workingAge.push(json_pop[i].wAgeNumb);
          children.push(json_pop[i].childrenNumb);
          older.push(json_pop[i].olderPNumb);
          totPop.push(json_pop[i].totalPop);
        }
        if(json_pop[i].Year == "2012"){
          yearArray.push(json_pop[i].Year);
          workingAge.push(json_pop[i].wAgeNumb);
          children.push(json_pop[i].childrenNumb);
          older.push(json_pop[i].olderPNumb);
          totPop.push(json_pop[i].totalPop);
        }
  
      }
    
    });
    console.log("yr",yearArray);
    console.log("workign age",workingAge);
    console.log("children",children);
    console.log("older",older);
    console.log("tot",totPop);

    popChartJs(yearArray[0],yearArray[1],yearArray[2],yearArray[3],yearArray[4],yearArray[5],yearArray[6],
      totPop[0],totPop[1],totPop[2],totPop[3],totPop[4],totPop[5],totPop[6],
      workingAge[0],workingAge[1],workingAge[2],workingAge[3],workingAge[4],workingAge[5],workingAge[6],
      children[0],children[1],children[2],children[3],children[4],children[5],children[6],
      older[0],older[1],older[2],older[3],older[4],older[5],older[6]);

  }

  function getZoopla(json_zoopla){
    
    console.log(json_zoopla);

      
      var turnover =json_zoopla.zoopla.turnover;
      var currentSalepriceAvg = json_zoopla.zoopla.average_sold_price_1year;
      var currentSalesNumb = json_zoopla.zoopla.number_of_sales_1year;
      var yr3SalepriceAvg = json_zoopla.zoopla.average_sold_price_3year;
      var yr3SalesNumb = json_zoopla.zoopla.number_of_sales_3year;
      var yr5SalepriceAvg = json_zoopla.zoopla.average_sold_price_5year;
      var yr5SalesNumb = json_zoopla.zoopla.number_of_sales_5year;
      var yr7SalepriceAvg = json_zoopla.zoopla.average_sold_price_7year;
      var yr7SalesNumb = json_zoopla.zoopla.number_of_sales_7year;

          
      var turnoverBrs =json_zoopla.zoopla_brs.areas[0].turnover;
      var currentSalepriceAvgBrs = json_zoopla.zoopla_brs.areas[0].average_sold_price_1year;
      var currentSalesNumbBrs = json_zoopla.zoopla_brs.areas[0].number_of_sales_1year;
      var yr3SalepriceAvgBrs = json_zoopla.zoopla_brs.areas[0].average_sold_price_3year;
      var yr3SalesNumbBrs = json_zoopla.zoopla_brs.areas[0].number_of_sales_3year;
      var yr5SalepriceAvgBrs = json_zoopla.zoopla_brs.areas[0].average_sold_price_5year;
      var yr5SalesNumbBrs = json_zoopla.zoopla_brs.areas[0].number_of_sales_5year;
      var yr7SalepriceAvgBrs = json_zoopla.zoopla_brs.areas[0].average_sold_price_7year;
      var yr7SalesNumbBrs = json_zoopla.zoopla_brs.areas[0].number_of_sales_7year;

    console.log("BRS AVG",currentSalepriceAvgBrs,yr5SalepriceAvgBrs);
    console.log("now AVG",currentSalepriceAvg,yr5SalepriceAvg);
      
      var turnoverOutcode =json_zoopla.zoopla_outcode.turnover;
      var currentSalepriceAvgOutcode = json_zoopla.zoopla_outcode.average_sold_price_1year;
      var currentSalesNumbOutcode = json_zoopla.zoopla_outcode.number_of_sales_1year;
      var yr3SalepriceAvgOutcode = json_zoopla.zoopla_outcode.average_sold_price_3year;
      var yr3SalesNumbOutcode = json_zoopla.zoopla_outcode.number_of_sales_3year;
      var yr5SalepriceAvgOutcode = json_zoopla.zoopla_outcode.average_sold_price_5year;
      var yr5SalesNumbOutcode = json_zoopla.zoopla_outcode.number_of_sales_5year;
      var yr7SalepriceAvgOutcode = json_zoopla.zoopla_outcode.average_sold_price_7year;
      var yr7SalesNumbOutcode = json_zoopla.zoopla_outcode.number_of_sales_7year;

      zooplaChartJS("1 Year","3 Years","5 Years","7 Years",currentSalepriceAvg,yr3SalepriceAvg,yr5SalepriceAvg,
      yr7SalepriceAvg,currentSalepriceAvgBrs,yr3SalepriceAvgBrs,yr5SalepriceAvgBrs,yr7SalepriceAvgBrs,currentSalepriceAvgOutcode,
      yr3SalepriceAvgOutcode,yr5SalepriceAvgOutcode,yr7SalepriceAvgOutcode);
}