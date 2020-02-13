function makeChartJsCrime(label1,label2,label3,makeJSONarr,){
    
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [label1,label2,label3],
        datasets: makeJSONarr
    },

    // Configuration options go here
    options: {
        responsive: true,
    }
});


}