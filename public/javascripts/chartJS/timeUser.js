/*Visual to show admin the user count */
function timeChart(div,labelz,datas){

var config= {
  type: 'line',
  data: {
    labels:labelz,
    datasets: [{
      label: 'Amount of users',
      data: datas,
      fill: false,
      backgroundColor: "red",
      borderColor: "red",
      borderWidth: 1,
      pointRadius: 10,
      pointHoverRadius: 15,
      pointStyle:'triangle',
      //showLine: false 
    }]
  },
  /*options: {
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'linear'
      }]
    }
  }*/
  options: {
    animation: {
        duration: 0
    },
    scales: {
        xAxes: [{
     
        }],
        yAxes: [
            {
                ticks: {
                    min: 0
                    ,max: 5
                    ,callback: function(val) {
                        if(val == 0 || val == 5) {
                            return null;
                        }
                        return Number.isInteger(val) ? val : null;
                    }
                }
            }
        ]
    },
    tooltips: {
        intersect: false,
        mode: 'index',
  
    }
}
}


var ctx = document.getElementById(div).getContext("2d");;
var chart = new Chart(ctx, config);
 
}