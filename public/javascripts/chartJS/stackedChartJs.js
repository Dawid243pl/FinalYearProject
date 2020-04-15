function makeStacked(div,barChartData){

    var ctx = document.getElementById(div).getContext('2d');
    //ctx.height = 800;
    var myBar = new Chart(ctx, {
        type: 'horizontalBar',
        data: barChartData,
    
        options: {
            maintainAspectRatio: true,
            title: {
                display: true,
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
            },
            plugins: {
                datalabels: {
                    color: 'black',
                    anchor: "end",
                    align: "right",
                    offset: 10,
                    display: function (context) {
                        return context.dataset.data[context.dataIndex];
                    },
                    /* Adjust data label font size according to chart size */
            			  font: function(context) {
                        var width = context.chart.width;
                        var size = Math.round(width / 32);

                        return {
                	          weight: 'bold',
                            size: size
                        };
                     },
                    formatter: Math.round
                }
            }
        }
    });
}
