
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