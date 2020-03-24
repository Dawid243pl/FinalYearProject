function makeStacked(div,barChartData){

    var ctx = document.getElementById(div).getContext('2d');
    //ctx.height = 800;
    var myBar = new Chart(ctx, {
        type: 'horizontalBar',
        data: barChartData,
    
        options: {
            //maintainAspectRatio: false,
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
