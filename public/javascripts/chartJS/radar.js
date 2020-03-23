var randomScalingFactor = function() {
    return Math.round(Math.random() * 100);
};

function radarData(data1,data2,data3){

var chartColors = window.chartColors;
var color = Chart.helpers.color;
var config = {
    type: 'polarArea',
    data: {
        datasets: [{
            data: [
                data1,
                data2,
                data3
            ],
            backgroundColor: [
                color("red").alpha(0.5).rgbString(),
                color("orange").alpha(0.5).rgbString(),
                color("yellow").alpha(0.5).rgbString(),
         
            ],
            label: 'My dataset' // for legend
        }],
        labels: [
            'Crime',
            'Housing',
            'Population',
        
        ]
    },
    options: {
        responsive: true,
        legend: {
            position: 'right',
        },
        title: {
            display: false,
            text: 'Chart.js Polar Area Chart'
        },
        scale: {
            ticks: {
                beginAtZero: true
            },
            reverse: false
        },
        animation: {
            animateRotate: false,
            animateScale: true
        }
    }
};
/*
window.onload = function() {
    var ctx = document.getElementById('graphicOftop3');
    window.myPolarArea = new Chart(ctx, config);
};*/    
		var ctx = document.getElementById('graphicOftop3');
		var myPolarArea = new Chart(ctx, config);

}
/*
document.getElementById('randomizeData').addEventListener('click', function() {
    config.data.datasets.forEach(function(piece, i) {
        piece.data.forEach(function(value, j) {
            config.data.datasets[i].data[j] = randomScalingFactor();
        });
    });
    window.myPolarArea.update();
});
*/
/*
var colorNames = Object.keys(window.chartColors);
document.getElementById('addData').addEventListener('click', function() {
    if (config.data.datasets.length > 0) {
        config.data.labels.push('data #' + config.data.labels.length);
        config.data.datasets.forEach(function(dataset) {
            var colorName = colorNames[config.data.labels.length % colorNames.length];
            dataset.backgroundColor.push(window.chartColors[colorName]);
            dataset.data.push(randomScalingFactor());
        });
        window.myPolarArea.update();
    }
});
document.getElementById('removeData').addEventListener('click', function() {
    config.data.labels.pop(); // remove the label first
    config.data.datasets.forEach(function(dataset) {
        dataset.backgroundColor.pop();
        dataset.data.pop();
    });
    window.myPolarArea.update();
});
*/