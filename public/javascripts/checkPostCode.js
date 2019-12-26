
$(function(){
  
        
      navigator.geolocation.getCurrentPosition(async position => {
        
        try {
          //lat = position.coords.latitude;
          //lon = position.coords.longitude;
        
    
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

          console.log("postC",postC,lat,long,easting,northing);
          /* 
          document.getElementById('summary').textContent = weather.summary;
          document.getElementById('temp').textContent = weather.temperature;
          document.getElementById('aq_parameter').textContent = air.parameter;
          document.getElementById('aq_value').textContent = air.value;
          document.getElementById('aq_units').textContent = air.unit;
          document.getElementById('aq_date').textContent = air.lastUpdated;
            */
          //console.log(weather.summary);
     
      
        } catch (error) {
          console.error(error);
          air = { value: -1 };
          document.getElementById('aq_value').textContent = 'NO READING';
        }
    
      });

    
  });