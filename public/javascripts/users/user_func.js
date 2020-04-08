/*This file is used for managning the user accounts*/
//Add crime to db
$(function(){


  //if no user is selected throw an error if the rating is selected get the value of the selected rating
  $("#deleteRating").click(function () {
  

    if($('input[name="ratingWard"]:checked').val() == null){

      alert("please select a rating to delete");

    }else{

      var selectedWard = $('input[name="ratingWard"]:checked').val();
      $("#removeRatingWard").val(selectedWard);
    }

  });

  });

      //fuction to get crime and population levels
      function getCrimeUserLevel(json_crime,wrd,ratingArrr){

        
        var chartJsArrayLabels=[];
        var colourCheckerArray=[];  
        var additionalWards=[];

        var wardArr1=[];
        var crimzArr1=[];
        var popzzArr1=[];

        var wardArr2=[];
        var crimzArr2=[];
        var popzzArr2=[];

        var wardArr3=[];
        var crimzArr3=[];
        var popzzArr3=[];
        
        var currentWardPop =[];
        var currentWardCrime=[];
        //for each wards crime grab the infromation required for 3 years of trend 
        $.each(json_crime, function(i){
    
          if( json_crime[i].year =="2018-19" ){
      
            var wardCurrent = json_crime[i].WardName;
            var trendYears = json_crime[i].year;
            chartJsArrayLabels.push(trendYears);
            
           //if this ward make a json object and append crime and population statistics
            if( json_crime[i].WardName ==wrd){
             
             
              var crimeStat3 = new Object();
              crimeStat3.name = "Total crimes";
              crimeStat3.percent = 100;
              crimeStat3.actual =  numberWithCommas(json_crime[i].totalCrimes);
              crimeStat3.wName = json_crime[i].WardName;
          
              $("#popStatUser").append(json_crime[i].population);
              $("#crimeStatUser").append(json_crime[i].totalCrimes);



              currentWardPop.push(json_crime[i].population);
              currentWardCrime.push(json_crime[i].totalCrimes);


              colourCheckerArray.push(json_crime[i].population,json_crime[i].totalCrimes);

            }
            if(json_crime[i].WardName =="Bristol"){
             
             
              colourCheckerArray.push(json_crime[i].population,json_crime[i].totalCrimes);
           }

           //for each of the users ratings grab the population,ward name and crime data
           for (var zx=0;zx < ratingArrr.length;zx++){
            if( json_crime[i].WardName ==ratingArrr[zx]){
      
              wardArr1.push(json_crime[i].WardName);
              crimzArr1.push(json_crime[i].totalCrimes);
              popzzArr1.push(json_crime[i].population);

            }
           }
          
        }
        if( json_crime[i].year =="2017-18" ){
      
          for (var zx=0;zx < ratingArrr.length;zx++){
            if( json_crime[i].WardName ==ratingArrr[zx]){
              
              wardArr2.push(json_crime[i].WardName);
              crimzArr2.push(json_crime[i].totalCrimes);
              popzzArr2.push(json_crime[i].population);
            }
           }
        }
        if( json_crime[i].year =="2016-17" ){
          

          for (var zx=0;zx < ratingArrr.length;zx++){
            if( json_crime[i].WardName ==ratingArrr[zx]){
              
              wardArr3.push(json_crime[i].WardName);
              crimzArr3.push(json_crime[i].totalCrimes);
              popzzArr3.push(json_crime[i].population);
            }
           }

           
        }
        
        });

        var labels =  ['2016-17', '2017-18','2018-19'];
        var colourArray=[["red","blue","green","yellow","grey","orange"],["#cf000f","#1f3a93","#00b16a","#f7ca18","#e87e04","#abb7b7"]];
        var objArray =[];
        var objArray2 =[];
        
        //making json obejcts for cime and population
        for (p =0;p <ratingArrr.length;p++){

          var someObj = new Object();
          someObj.label = ratingArrr[p]+" Total Population";
          someObj.data = [popzzArr3[p],popzzArr2[p],popzzArr1[p]];
          someObj.backgroundColor =  colourArray[0][p];
          someObj.borderColor = colourArray[0][p];
          someObj.fill = false;

          objArray.push(someObj);

          var someObj2 = new Object();
          someObj2.label = ratingArrr[p] +" Total Crime";
          someObj2.data = [crimzArr3[p],crimzArr2[p],crimzArr1[p]];
          someObj2.backgroundColor =  colourArray[1][p];
          someObj2.borderColor = colourArray[1][p];
          someObj2.fill = false;
          
          objArray.push(someObj2);
        }
        //making the visual for user rating stats
        basicBarChart("ratingStats",labels[0],labels[1],labels[2],objArray); 

        //getting colour coding on population and crime
        var userPopColour = colourCoding(colourCheckerArray[2],colourCheckerArray[0]);
        var userCrimeColour = colourCoding(colourCheckerArray[3],colourCheckerArray[1]);

        $("#popStatUser").addClass("btn btn-"+userPopColour);
        $("#crimeStatUser").addClass("btn btn-"+userCrimeColour);

        currentWardPop.push(currentWardCrime[0])

        return currentWardPop;
      }  

      //getting housing data
      function getHouseUserLevel(json_housing,ward,ratingArrr){

        console.log(json_housing);

        /*---------Owned-----------------*/
        var totalHouseholdsBed =0;
        var totalHouseholdsBedBrs=0;
        //for each housing size get the toal number of beds
        $.each(json_housing.housing_size.records, function(i){
      
        

          if(json_housing.housing_size.records[i].record.fields["2016_ward_name"] ==ward){
      
            totalHouseholdsBed = json_housing.housing_size.records[i].record.fields.total_number_of_households;
         
          }    
        
            totalHouseholdsBedBrs = totalHouseholdsBedBrs +json_housing.housing_size.records[i].record.fields.total_number_of_households;
     
        });

        var userHouseColour = colourCoding(totalHouseholdsBed,totalHouseholdsBedBrs);
        //append the total number of beds
        $("#houseStatUser").append(totalHouseholdsBed);
        $("#houseStatUser").addClass("btn btn-"+userHouseColour);        
        return totalHouseholdsBed;
     
       
      
      }




      
      async function fetchUserData()  {
    try{
      //let response = await fetch(`crime_create/${ward}/${bulglary}/${sexOffence}/${allCrimes}/${totalPop}/${year}`);

      //pull user info
      const api_url_userDetails = `userInfo`;
      const response_userDetails = await fetch(api_url_userDetails);
      const json_userDetails = await response_userDetails.json();


      var usersPostcode = json_userDetails.User[0].PostCode;
      //fill the edit form with user infp   
      $("input#inputEmail4").val(json_userDetails.User[0].Email);
      $("input#validationDefault01").val(json_userDetails.User[0].fName);
      $("input#validationDefault02").val(json_userDetails.User[0].lName);
      $("input#inputAddress").val(json_userDetails.User[0].Address);
      $("input#inputZip").val(json_userDetails.User[0].PostCode);
      $("input#inputCity").val(json_userDetails.User[0].City);

      //getting postcode data
      const api_url = `../postCode/${usersPostcode}`;
      const response = await fetch(api_url);
      const json = await response.json();

      postC =  json.postcode.result.postcode;
      lat = json.postcode.result.latitude;
      long = json.postcode.result.longitude;
      easting = json.postcode.result.eastings;
      northing = json.postcode.result.northings;
      ward = json.postcode.result.admin_ward;

      var ratingArrr =[];
      //gettin users rating
      const api_url_rating = `accountRating`;
      const response_rating = await fetch(api_url_rating);
      const json_rating = await response_rating.json();

      //if the user has rated a ward display these wards if not infrom the user then have not rated any wards and dsiplay only the default 
      //ward that is pulled from their user address
      if(!json_rating.length == 0) {
 
        $.each(json_rating, function(i){
          
          $(".tBodyUserRate").append("<tr><td>"+json_rating[i].WardName+"</td/><td>"+json_rating[i].q1+"</td><td>"+json_rating[i].q2+"</td><td>"+json_rating[i].q3+"</td><td><input type='radio' class='ratingWard' name='ratingWard' value='"+json_rating[i].WardName+"'></td></tr>");
          ratingArrr.push(json_rating[i].WardName);
        });

      }else{
        $(".tBodyUserRate").append("<p>You have not rated any ward</p>");
        ratingArrr.push(ward);
      }

      //calling the the apis and database for data
      const api_url_crime = `../listCrime/${usersPostcode}`;
      const response_crime = await fetch(api_url_crime);
      const json_crime = await response_crime.json();

      var api_url_housing = `../housing`;
      var response_housing = await fetch(api_url_housing);
      var json_housing = await response_housing.json();

      //creating the visuals
      var crimeARR =getCrimeUserLevel(json_crime,ward,ratingArrr);
      var houseARR =getHouseUserLevel(json_housing,ward,ratingArrr);

      radarData(crimeARR[1],houseARR,crimeARR[0]);
     
    }catch(err){
      console.error(err);
      // Handle errors here
    }
  }

