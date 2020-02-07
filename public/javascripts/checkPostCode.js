
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

       
        
        $(".searchRes").append("Your Search<br> Ward: "+ward+" Postcode: "+postC);

        //check a list of wards if ward not in DB ERROR
        $(".cont-h#brs").append("Bristol");
        $(".cont-h#wrd").append(ward);
     

        const api_url_crime = `listCrime/${ward}`;
        const response_crime = await fetch(api_url_crime);
        const json_crime = await response_crime.json();
   

        const api_url_weather = `weather/${lat}/${long}`;
        const response_weather = await fetch(api_url_weather);
        const json_weather = await response_weather.json();

        /*
        const api_url_edu = `education/${ward}`;
        const response_edu = await fetch(api_url_edu);
        const json_edu = await response_edu.json();
*/
      
        const api_url_quall = `ListQuallity/${ward}`;
        const response_quall = await fetch(api_url_quall );
        const json_quall  = await response_quall.json();

        console.log(lat,long);

        
        //console.log(d.toLocaleDateString());
        
        var dateArray=[];

        for(var y =0;y<3;y++){
          var d = new Date();
          d.setMonth(d.getMonth() - 1);
          d.setMonth(d.getMonth() - y);
          
          dateArray.push(d);
        }

        console.log("date array",dateArray);

       var policeDataObj = [];

       for(var z =0;z<dateArray.length;z++){
          
          var mm = dateArray[z].getMonth()+1;
          var yr = dateArray[z].getFullYear();

          var combinedDate =yr+'-'+mm;
          console.log("combined",combinedDate);
          
          var api_url_police = `/policeData/${combinedDate}/${lat}/${long}/`;
          var response_police = await fetch(api_url_police);
          var json_police  = await response_police.json();

          $.each(json_police, function(i){
           
            var length = json_police[i].length;

            for(var l = 0;l < length;l++){

              console.log("police",json_police[i][l]);
              
              $(".latestCrime").append("<li class='my-list list-group-item d-flex justify-content-between align-items-center'>% "+json_police[i][l].category+"<span class='badge badge-primary badge-pill'>"+json_police[i][l].month+"</span></div>");
        
            }
         
          });

          //console.log(json_police);
         
            //policeDataObj.push(json_police);
          
          
          }

        //console.log(policeDataObj,"police data");



        //policeDataObj[0].category;

/*
        category: "public-order"
        location_type: "Force"
        location:
        latitude: "51.466777"
        street: {id: 545032, name: "On or near Mallard Close"}
        longitude: "-2.537445"
        __proto__: Object
        context: ""
        outcome_status: {category: "Unable to prosecute suspect", date: "2019-04"}
        persistent_id: "b2ee197de3f094f89db755d7a61e9042d87ddd8438b70d33037765d5d2ba1dfb"
        id: 73227419
        location_subtype: ""
        month: "2019-04"
*/


      
      getQuallity(json_quall);
      //getEdu(json_edu);
      getWeather(json_weather);
      getCrime(json_crime);

      } 
      catch (error) {
        console.error(error);
        air = { value: -1 };
        document.getElementById('aq_value').textContent = 'NO READING';
      }

});




});