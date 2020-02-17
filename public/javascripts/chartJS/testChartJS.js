/*
var barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: "red",
        data: [
          1,
          2,
          3
        ]
    }, {
        label: 'Dataset 2',
        backgroundColor: "blue",
        data: [
           4,
           5,
           6

        ]
    }, {
        label: 'Dataset 3',
        backgroundColor: "green",
        data: [
            7,
            8,
            9
        ]
    }]

};
console.log("see",barChartData);
window.onload = function() {
    var ctx = document.getElementById('canvasTest').getContext('2d');
    window.myBar = new Chart(ctx, {
        
        type: 'bar',
        data: barChartData,
        options: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    });
};*/