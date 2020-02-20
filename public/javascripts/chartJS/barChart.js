function barChart(div,makeJSONarr){
    
    var ctx = document.getElementById(div).getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels:["cos"],
            datasets: makeJSONarr
        },
    
        // Configuration options go here
        options: {
            responsive: true,
        }
    });
    
    
    }