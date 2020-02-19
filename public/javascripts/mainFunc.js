
function checkSite(){
  if (window.location.pathname == "/"){

    $("#sBox").remove();
    $("body").addClass("HomePage");
  }
  else if (window.location.pathname == "/findArea"){
    $("body").addClass("HomePage");
  }else{
    $("#sBox").remove();
  }
};
checkSite();

function avgTwoNumb(x,y){
    var average=((x+y)/2).toFixed(2);

    return average;
}

function containsEncodedComponents(x) {
    // ie ?,=,&,/ etc
    if ((decodeURI(x) !== decodeURIComponent(x)) == false){
        return decodeURIComponent(x);

    }else{
        return(x);
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function checkPostCode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
    return regex.test(postcode);
}

function val(){

    var pCode = $("#inputPostC").val();
    if(!pCode){
       alert("Please enter a valid Postcode")
        return false;
    }
    else{
      checkBristol(pCode);
      //console.log(cityCheck);
        //return true;
        /*
        var cityCheck = checkBristol(pCode);
        console.log(cityCheck);
        if (cityCheck === "Bristol"){
          console.log("true");
          return true;
        }else{
          console.log("false");
          return false;
        }
        */
       return false;
    }
}


function checkBristol(pCode){

  $.getJSON('../postCode/'+pCode, function(data) {
    if (data.postcode.result.primary_care_trust == "Bristol"){
      document.getElementById("locationForm").submit();
      return true;

    }else{
      return false;
    }
});

  
};

function resetForm(){
  //document.getElementById("ratings").reset();
  setTimeout(function(){ document.getElementById("ratings").reset(); }, 100);  
  console.log("cleared")


};

function oneDcm(calc){
  var calculation = Math.round(calc * 10 ) / 10;
  return calculation;
}

$(".viewAll").click(function() {
  $(this).parent().find(".hiddenCont").slideToggle( "slow");
});

