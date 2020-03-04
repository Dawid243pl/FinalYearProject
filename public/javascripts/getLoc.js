
$(function(){

$("#locBtn").click(function () {
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
    
    //var Low  = "51.467038";
    //var High = "-2.537563";


    var latz  = position.coords.latitude;
    var longz = position.coords.longitude;

    latz = parseFloat(latz.toFixed(6));

    console.log(latz);
    console.log(longz);

    $("#latti").val(latz);
    $("#longi").val(longz);

    $('#locationForm2').submit();
    
}



});