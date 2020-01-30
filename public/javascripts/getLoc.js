
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
    
    var Low  = "51.467038";
    var High = "-2.537563";

    $("#lat").val(Low);
    $("#long").val(High);
    $('#locationForm').submit();
    
}


});