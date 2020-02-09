function zooplaChartJS(CurrentYear,Yr3,Yr5,Yr7,currentSoldprice,yr3Soldprice,yr5Soldprice,yr7currentSoldprice,currentSoldpriceBrs,yr3SoldpriceBrs,yr5SoldpriceBrs,yr7currentSoldpriceBrs,currentSoldpriceOutcode,yr3SoldpriceOutcode,yr5SoldpriceOutcode,yr7currentSoldpriceOutcode){
    console.log(currentSoldpriceBrs,yr3SoldpriceBrs,yr5SoldpriceBrs,yr7currentSoldpriceBrs);
    var ctx = document.getElementById('zooplaChart').getContext('2d');

    var chart = new Chart(ctx, {  
        type: 'line',
        data: {
            labels: [CurrentYear,Yr3,Yr5,Yr7],
            datasets: [{
                label: 'BS57tw',
                backgroundColor: "red",
                borderColor: "red",
                data: [
                    currentSoldprice,
                    yr3Soldprice,
                    yr5Soldprice,
                    yr7currentSoldprice
                ],
                fill: false,
            }, {
                label: 'Bristol',
                fill: false,
                backgroundColor: "blue",
                borderColor: "blue",
                data: [
                    currentSoldpriceBrs,
                    yr3SoldpriceBrs,
                    yr5SoldpriceBrs,
                    yr7currentSoldpriceBrs
                ],
            }
            , {
                label: 'BS5',
                fill: false,
                backgroundColor: "green",
                borderColor: "green",
                data: [
                    currentSoldpriceOutcode,
                    yr3SoldpriceOutcode,
                    yr5SoldpriceOutcode,
                    yr7currentSoldpriceOutcode
                ],
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                x: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                },
                y: {
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }
            }
        }
});
 

}
