/*bar chart used for the Crime data*/
function barChart(div,makeJSONarr){
    
    var ctx = document.getElementById(div).getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
    
        // The data for our dataset
        data: {
            labels:["Cimres in all wards"],
            datasets: makeJSONarr
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            legend: {
				display: false,
            },
            
        }
    });
    
    
    }