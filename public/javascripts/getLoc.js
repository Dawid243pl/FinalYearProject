
$(function(){



$("#locBtn").click(function () {
    getLocation();
  });


  $("#locBtnPscode").click(function () {
    getLocation();
  });


  
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }

}

function showPosition(position) {
    //console.log("YOLO",position.coords.latitude,position.coords.longitude);

    //var lat = position.coords.latitude;
    //var long = position.coords.longitude;

    //var Low  = parseFloat(lat).toFixed(7);
    //var High = parseFloat(long).toFixed(7);
    
    
    var Low  = "51.467038";
    var High = "-2.537563";

    $("#lat").val(Low);
    $("#long").val(High);
    $('#locationForm').submit();
    
}


});