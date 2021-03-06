/*Visual to show line chart for housing zoopla API */
function zooplaChartJS(CurrentYear,Yr3,Yr5,Yr7,currentSoldprice,yr3Soldprice,yr5Soldprice,yr7currentSoldprice,currentSoldpriceBrs,yr3SoldpriceBrs,yr5SoldpriceBrs,yr7currentSoldpriceBrs,currentSoldpriceOutcode,yr3SoldpriceOutcode,yr5SoldpriceOutcode,yr7currentSoldpriceOutcode,curPostCode,outcode){
 
    var ctx = document.getElementById('zooplaChart').getContext('2d');

    var chart = new Chart(ctx, {  
        type: 'line',
        data: {
            labels: [Yr7,Yr5,Yr3,CurrentYear],
            datasets: [{
                label: curPostCode,
                backgroundColor: "#24252a",
                borderColor: "#24252a",
                data: [
                    
                    yr7currentSoldprice,
                    yr5Soldprice,
                    yr3Soldprice,
                    currentSoldprice
                ],
                fill: false,
            }, {
                label: 'Bristol',
                fill: false,
                backgroundColor: "#304e8e",
                borderColor: "#304e8e",
                data: [
                    yr7currentSoldpriceBrs,
                    yr5SoldpriceBrs,
                    yr3SoldpriceBrs,
                    currentSoldpriceBrs,
                ],
            }
            , {
                label: outcode,
                fill: false,
                backgroundColor: "#007bff",
                borderColor: "#007bff",
                data: [
                    yr7currentSoldpriceOutcode,
                    yr5SoldpriceOutcode,
                    yr3SoldpriceOutcode,
                    currentSoldpriceOutcode,
                ],
            }]
        },
        options: {
            responsive: true,
            //maintainAspectRatio: true,
            title: {
                display: true,
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

