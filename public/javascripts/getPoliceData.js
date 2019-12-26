// Geo Locate
//let lat, lon;
$(function(){
  console.log("DWAAAAAAAAAAAAAAAAAAAAAAlat",latz,"lon",longz);
  

  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
      let weather, air;
      try {
        //lat = position.coords.latitude;
        //lon = position.coords.longitude;
        document.getElementById('latitude').textContent = latz;
        document.getElementById('longitude').textContent = longz;
  
        const api_url = `weather/${latz}/${longz}`;
        const response = await fetch(api_url);
        const json = await response.json();

        weather = json.weather.currently;
        air = json.air_quality.results[0].measurements[0];

        document.getElementById('summary').textContent = weather.summary;
        document.getElementById('temp').textContent = weather.temperature;
        document.getElementById('aq_parameter').textContent = air.parameter;
        document.getElementById('aq_value').textContent = air.value;
        document.getElementById('aq_units').textContent = air.unit;
        document.getElementById('aq_date').textContent = air.lastUpdated;

        //console.log(weather.summary);
        /*
        document.getElementById('summary').textContent = weather.summary;
        document.getElementById('temp').textContent = weather.temperature;
        document.getElementById('aq_parameter').textContent = air.parameter;
        document.getElementById('aq_value').textContent = air.value;
        document.getElementById('aq_units').textContent = air.unit;
        document.getElementById('aq_date').textContent = air.lastUpdated;
        */
      } catch (error) {
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
  } else {
    console.log('geolocation not available');
  }
  
});