
function basicBarChart(div,label1,label2,label3,makeJSONarr){
    
    //var ctx = document.getElementById(div).getContext('2d');
    var config = {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels:[label1,label2,label3],
            datasets: makeJSONarr
        },
    
        // Configuration options go here
        options: {
            responsive: false,
            maintainAspectRatio: false,
            tooltips: {
                enabled: true,
            },
            legend: {
                position:'bottom'
            },
        },
       
    }
    

    var ctx = document.getElementById(div);
    var chart = new Chart(ctx, config);
     
    
function init() {
    // Chart declaration:
    var chartType = document.getElementById('type').value; 
    chart = new Chart(ctx, {
      type: chartType,
      data: {
        labels:[label1,label2,label3],
        datasets: makeJSONarr
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
            enabled: true,
        },
        legend: {
            position:'bottom'
        },
    },
    });
  }

  
    document.getElementById('update').addEventListener('click', function() {

        chart.destroy();
        
        init();
    });
  
    
    }
