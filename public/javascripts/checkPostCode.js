
$(function(){


    navigator.geolocation.getCurrentPosition(async position => {

      try {

        var text= "";

        var postC =  "";
        var latz = "";
        var longz = "";
        var easting = "";
        var northing = "";
        var ward = "";

        if(postcode == ""){

          text = `postCode2/${long}/${lat}`;
          

          const api_url = text;
          const response = await fetch(api_url);
          const json = await response.json();
       

          postC =  json.postcode.result[0].postcode;
          latz = json.postcode.result[0].latitude;
          longz = json.postcode.result[0].longitude;
          easting = json.postcode.result[0].eastings;
          northing = json.postcode.result[0].northings;
          ward = json.postcode.result[0].admin_ward;

         
        }else{
          text = `postCode/${postcode}`

          const api_url = text;
          const response = await fetch(api_url);
          const json = await response.json();
          

          postC =  json.postcode.result.postcode;
          latz = json.postcode.result.latitude;
          longz = json.postcode.result.longitude;
          easting = json.postcode.result.eastings;
          northing = json.postcode.result.northings;
          ward = json.postcode.result.admin_ward;
          
        }

        
     
        //weather = json.weather.currently;
        //air = json.air_quality.results[0].measurements[0];

        
        console.log("latz longz",latz,longz);
        //set value of hidden field
        $("#wardNamezHidden").val(ward);
         //to redirect to home page if ward does not exist

        const api_url_ward = `listWards`;
        const response_ward = await fetch(api_url_ward);
        const json_ward = await response_ward.json();

       
        ward = ward.replace('and','&');

        var falseWard = false;

        $.each(json_ward.wards.records, function(i){

          
          var wrd = json_ward.wards.records[i].record.fields.name;

          if (wrd === ward){
            
            falseWard = true;
          }
          
        });

        if (falseWard == false){

          location.replace("/")
          
        }

        //check a list of wards if ward not in DB ERROR

        $(".searchRes").append("Your Search<br> Ward: "+ward+" Postcode: <div id='pagePS'>"+postC+"</div>");

        //check a list of wards if ward not in DB ERROR
        $(".cont-h#brs").append("Bristol");
        $(".cont-h#wrd").append(ward);
     

        const api_url_crime = `listCrime/${ward}`;
        const response_crime = await fetch(api_url_crime);
        const json_crime = await response_crime.json();
   

        //const api_url_weather = `weather/${latz}/${longz}`;
        ///const response_weather = await fetch(api_url_weather);
        //const json_weather = await response_weather.json();

      
        const api_url_quall = `ListQuallity/${ward}`;
        const response_quall = await fetch(api_url_quall );
        const json_quall  = await response_quall.json();


        
        //console.log(d.toLocaleDateString());
        
        var dateArray=[];

        for(var y =0;y<3;y++){
          var d = new Date();
          d.setMonth(d.getMonth() - 1);
          d.setMonth(d.getMonth() - y);
          
          dateArray.push(d);
        }

        policeJsonArr =[];
       for(var z =0;z<dateArray.length;z++){
          
          var mm = dateArray[z].getMonth()+1;
          var yr = dateArray[z].getFullYear();

          var combinedDate =yr+'-'+mm;
          console.log("combined",combinedDate);
          
          var api_url_police = `/policeData/${combinedDate}/${latz}/${longz}/`;
          var response_police = await fetch(api_url_police);
          var json_police  = await response_police.json();

          policeJsonArr.push(json_police);
      }

      initMap(policeJsonArr,latz,longz);

      var api_url_pop = `/getPopulation`;
      var response_pop = await fetch(api_url_pop);
      var json_pop  = await response_pop.json();    

      var api_url_zoopla = `/zooplaAPI/${postC}`;
      var response_zoopla = await fetch(api_url_zoopla);
      var json_zoopla  = await response_zoopla.json(); 

      var api_url_housing = `/housing`;
      var response_housing = await fetch(api_url_housing);
      var json_housing = await response_housing.json();
      
      var api_url_review = `/users/reviewCount/${ward}`;
      var response_review = await fetch(api_url_review);
      var json_review = await response_review.json(); 
      
      getUserReview(json_review);
      getQuallity(json_quall);
      //getWeather(json_weather);
      getCrime(json_crime,ward);
      getPopulation(json_pop,ward);
      getZoopla(json_zoopla,ward);
      getHousing(json_housing,ward);
      

      } 
      catch (error) {
        console.error(error);
        //air = { value: -1 };
        //document.getElementById('aq_value').textContent = 'NO READING';
      }

});




});