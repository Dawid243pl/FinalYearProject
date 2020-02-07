function makeChartJsCrime(label1,label2,label3,dataset1,dataset2,dataset3){
    
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [label1,label2,label3],
        datasets: [{
            label: 'Total Crimes 3 Year Trend',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: '#000000',
            data: [dataset1,dataset2,dataset3]
        }]
    },

    // Configuration options go here
    options: {}
});

}