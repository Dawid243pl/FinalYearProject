/*This file deals with geting the users GEO location*/
$(function() {
	//when the location button is clicked get the location of the user
	$("#locBtn").click(function() {
		getLocation();
	});
	//check if the users geolaction is supported if it show the users position
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	}
	//get the lattitude and the longtitude of the user and set the froms hidden fields to those values
	function showPosition(position) {
		var latz = position.coords.latitude;
		var longz = position.coords.longitude;
		latz = parseFloat(latz.toFixed(6));
		console.log(latz);
		console.log(longz);
		$("#latti").val(latz);
		$("#longi").val(longz);
		$('#locationForm2').submit();
	}
});