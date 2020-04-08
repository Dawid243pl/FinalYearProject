//check if the user is on the home page if they are remove the second search box othewrise if the user is on the resutls page show the second serach field
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

//run the function on each page
checkSite();

//get the average between two numbers
function avgTwoNumb(x,y){
    var average=((x+y)/2).toFixed(2);

    return average;
}

//check if the word has any encoded components
function containsEncodedComponents(x) {
    // ie ?,=,&,/ etc
    if ((decodeURI(x) !== decodeURIComponent(x)) == false){
        return decodeURIComponent(x);

    }else{
        return(x);
    }
  }

  //add commas for reading easbillity to big integers
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//regex to valide postcode format
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
//function that checks the postcode by calling the checkBristol function used when the user seraches for a location
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

//
function checkBristol(pCode){
  var checkPFormat = checkPostCode(pCode);

  if(checkPFormat){
    $.getJSON('../postCode/'+pCode, function(data) {
      
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

  var pCode = document.getElementById("pagePS").textContent;
  
  console.log(pCode);

  var ward = [];
  var checker= 1;
    $.getJSON('../postCode/'+pCode, function(data) {
      
      console.log(data);

      console.log(data.postcode.result);

     console.log(data.postcode.result.admin_ward);
     ward.push(data.postcode.result.admin_ward);

     $.getJSON('/users/accountRating', function(data2) {
      
      console.log("list",data2);

      for (var v=0;v < data2.length;v++){

        if(data2[v].WardName == ward[0]){

         
          checker = -1;
        }else{
         
        }

      }
      
      if (checker > 0 ){
        alert("Your respone has been recorded");
        setTimeout(function(){ document.getElementById("ratings").reset(); }, 100);  
        document.getElementById("ratings").submit();
        
      }else{
        alert("You have already voted for this ward your response could not be submitted");
      }
  
    });

  });
  
    

  //console.log("this ward",ward[0]);

  

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

$('a.btn#crimez').addClass("btn-success");

$('a.btn').on('click', function(e){

  $("a.btn").removeClass("btn-success");
  $(this).addClass("btn-success");


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
    
    return "danger";
  //else if it is less than 20% of the average green  
  }else if(actual <= (average * 0.8) ){

    return "success";

  //else its average amber
  }else{

    return "warning";
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

