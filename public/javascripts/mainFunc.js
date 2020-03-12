
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




function val2(){
  var lat =$("#latti").val();
  var long = $("#longi").val();

  console.log(lat,long);
  if(!latti){
     alert("Please enter a valid Postcode")
      return false;
  }
  else{
    console.log(lat,long);
    checkBristol2(lat,long);
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
  var checkPFormat = checkPostCode(pCode);
  alert(checkPFormat);
  if(checkPFormat){
    $.getJSON('../postCode/'+pCode, function(data) {
      
      alert(data.postcode.result.primary_care_trust );

      if (data.postcode.result.primary_care_trust == "Bristol"){
        document.getElementById("locationForm").submit();
        return true;
  
      }else{
        alert("Postcode not withing bristol");
        return false;
      }
  });
  }else{
    alert("Wrong postcode format");
    return false;
  }
  
  
};
function checkBristol2(lat,long){

  //console.log('../postCode2/'+long+'/'+lat);
  var txt = '/postCode2/'+long+'/'+lat;
  console.log("txt",txt)
  $.getJSON('/postCode2/'+long+'/'+lat, function(data) {
    console.log(txt);
    if (data.postcode.result[0].primary_care_trust == "Bristol"){
      console.log(data);
      //document.getElementById("locationForm2").submit();
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
  $(this).parent().find(".hiddenCont").slideToggle("slow");
  $(this).text(function(i, text){
    return text === "View Less" ? "View More" : "View Less";
})

});

$("#changePsw").click(function() {
 
  $("#ChngPasw").slideToggle("slow");
  
});


$("#openPassw").click(function() {
 
  $("#myModalz").toggle("slow");
  
});


$(".closez").click(function() {
 
  //$("#myModalz").toggle("slow");
  $(this).parent().parent().parent().parent().toggle("slow");
});

/*
$('a').on('click', function(){
  var target = $(this).attr('rel');
  $("#"+target).show().siblings("div").hide();
});
*/

$('a.btn#crimez').addClass("btn-warning");

$('a.btn').on('click', function(e){

  $("a.btn").removeClass("btn-warning");
  $(this).addClass("btn-warning");


  console.log("clicked");

  var target = $(this).attr('rel');

  console.log("target",target);

  $("."+target).show().siblings("div").hide();
  
  e.preventDefault();
  
});


function colourCoding(actual,average){

  average = average /34;
  console.log(actual,"vs",average);
  //if bigger than 20% of the average red
  if(actual >= (average * 1.2) ){
    //console.log("BIGGER RED");
    return "danger";
  //else if it is less than 20% of the average green  
  }else if(actual <= (average * 0.8) ){
    //console.log("SMALLER Amber");
    return "success";

  //else its average amber
  }else{
    //console.log("Medium GREEN")
    return "secondary";
  }

}
function isEmpty(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}