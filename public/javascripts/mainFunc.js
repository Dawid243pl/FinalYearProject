
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
        return true;
    }
}

