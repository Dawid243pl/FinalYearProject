      //Add crime to db
  
      function getCrimeUserLevel(json_crime,wrd,ratingArrr){

        var newJsonArrayWrd =[];     
        var chartJsArrayLabels=[];
        var colourCheckerArray=[];  

        $.each(json_crime, function(i){
    
          if( json_crime[i].year =="2018-19" ){
      
            var wardCurrent = json_crime[i].WardName;
            var trendYears = json_crime[i].year;
            chartJsArrayLabels.push(trendYears);
            
           
            if( json_crime[i].WardName ==wrd){
             
             
              var crimeStat3 = new Object();
              crimeStat3.name = "Total crimes";
              crimeStat3.percent = 100;
              crimeStat3.actual =  numberWithCommas(json_crime[i].totalCrimes);
              crimeStat3.wName = json_crime[i].WardName;
          
              $("#popStatUser").append(json_crime[i].population);
              $("#crimeStatUser").append(json_crime[i].totalCrimes);

              colourCheckerArray.push(json_crime[i].population,json_crime[i].totalCrimes);
              //var trendYears = json_crime[i].year;
          
              //newJsonArrayWrd.push(crimeStat3);
      
              //makeDonut(newJsonArrayWrd,chartWrd,"colour");
            }
            if(json_crime[i].WardName =="Bristol"){
              colourCheckerArray.push(json_crime[i].population,json_crime[i].totalCrimes);
           }

           /*
           for (var zx=0;zx < ratingArrr.length;zx++){
            if( json_crime[i].WardName ==ratingArrr[zx]){

            }
           }
          */
        }
        });
        //console.log(colourCheckerArray);

        //mainFuncGet(colourCheckerArray[2],colourCheckerArray[3]);

        var userPopColour = colourCoding(colourCheckerArray[2],colourCheckerArray[0]);
        var userCrimeColour = colourCoding(colourCheckerArray[3],colourCheckerArray[1]);

        $("#popStatUser").addClass("btn btn-"+userPopColour);
        $("#crimeStatUser").addClass("btn btn-"+userCrimeColour);
        return colourCheckerArray;
      }  


      function getHouseUserLevel(json_housing,ward,ratingArrr){

        console.log(json_housing);

        /*---------Owned-----------------*/
        var totalHouseholdsBed =0;
        var totalHouseholdsBedBrs=0;
        $.each(json_housing.housing_size.records, function(i){
      
        

          if(json_housing.housing_size.records[i].record.fields["2016_ward_name"] ==ward){
      
            totalHouseholdsBed = json_housing.housing_size.records[i].record.fields.total_number_of_households;
         
          }    
        
            totalHouseholdsBedBrs = totalHouseholdsBedBrs +json_housing.housing_size.records[i].record.fields.total_number_of_households;
     
        });

        var userHouseColour = colourCoding(totalHouseholdsBed,totalHouseholdsBedBrs);
        
        $("#houseStatUser").append(totalHouseholdsBed);
        $("#houseStatUser").addClass("btn btn-"+userHouseColour);        
        return totalHouseholdsBed;
     
       
      
      }




      
      async function fetchUserData()  {
    try{
      //let response = await fetch(`crime_create/${ward}/${bulglary}/${sexOffence}/${allCrimes}/${totalPop}/${year}`);


      const api_url_userDetails = `userInfo`;
      const response_userDetails = await fetch(api_url_userDetails);
      const json_userDetails = await response_userDetails.json();


      var usersPostcode = json_userDetails[0].PostCode;
         
      $("input#inputEmail4").val(json_userDetails[0].Email);
      $("input#validationDefault01").val(json_userDetails[0].fName);
      $("input#validationDefault02").val(json_userDetails[0].lName);
      $("input#inputAddress").val(json_userDetails[0].Address);
      $("input#inputZip").val(json_userDetails[0].PostCode);
      $("input#inputCity").val(json_userDetails[0].City);


      const api_url = `../postCode/${usersPostcode}`;
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

      var ratingArrr =[];

      const api_url_rating = `accountRating`;
      const response_rating = await fetch(api_url_rating);
      const json_rating = await response_rating.json();

     
      console.log("JWaw",json_rating);


      if(!json_rating.length == 0) {
        //$(".tableArea").append("<div class='table-responsive'><table class='table table-striped table-sm'><thead><tr><th>Ward</th><th>Q1</th><th>Q2</th><th>Q3</th></tr></thead><tbody>");
          
        $.each(json_rating, function(i){
          
          console.log("FOUND RTING");
          $(".tBodyUserRate").append("<tr><td>"+json_rating[i].WardName+"</td/><td>"+json_rating[i].q1+"</td><td>"+json_rating[i].q2+"</td><td>"+json_rating[i].q3+"</td></tr>");
          ratingArrr.push(json_rating[i].WardName);
        });
        //$(".tableArea").append("</tbody></table></div>");


      }else{
        console.log("EMPTY");
        $(".tBodyUserRate").append("<p>You have not rated any ward</p>");
        ratingArrr.push(ward);
      }

      const api_url_crime = `../listCrime/${usersPostcode}`;
      const response_crime = await fetch(api_url_crime);
      const json_crime = await response_crime.json();

      var api_url_housing = `../housing`;
      var response_housing = await fetch(api_url_housing);
      var json_housing = await response_housing.json();


      
      console.log(json_userDetails);
      console.log(json_crime,ward);

      var crimeARR =getCrimeUserLevel(json_crime,ward,ratingArrr);
      var houseARR =getHouseUserLevel(json_housing,ward,ratingArrr);

      console.log("rating awards",ratingArrr);

      radarData(crimeARR[2],crimeARR[3],houseARR);
      
      //lindeData(ratingArrr);


      //getHouseUserLevel(json_housing,ward);

      //return await response.json();
    }catch(err){
      console.error(err);
      // Handle errors here
    }
  }

