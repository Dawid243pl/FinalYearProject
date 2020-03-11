function makeStacked(div,barChartData){

    var ctx = document.getElementById(div).getContext('2d');
    var myBar = new Chart(ctx, {
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
}
