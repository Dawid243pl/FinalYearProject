function test(label1,label2,label3,makeJSONarr){
    var ctx = document.getElementById('myChart2').getContext('2d');
var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [label1,label2,label3],
            datasets: makeJSONarr
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Point Style: ' + 'circle'
            },
            legend: {
                display: false
            },
            
        }
    });;
}

