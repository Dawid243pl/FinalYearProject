/*Visual for display population working ages */
function popChartJs(date1,date2,date3,date4,date5,date6,date7,pop1,pop2,pop3,pop4,pop5,pop6,pop7,workingAge1,workingAge2,workingAge3,workingAge4,workingAge5,workingAge6,workingAge7,children1,children2,children3,children4,children5,children6,children7,old1,old2,old3,old4,old5,old6,old7){

var ctx = document.getElementById('popChart').getContext('2d');

var mixedChart = new Chart(ctx, {
    type: 'bar',
    data: {
        
        datasets: [ {
            label: 'Working Age',
            data: [workingAge1,workingAge2,workingAge3,workingAge4,workingAge5,workingAge6,workingAge7],
            type: 'line',
            // this dataset is drawn on top
            order: 1,
            //backgroundColor: 'rgb(255, 99, 132)',
            backgroundColor: '#007bff',
            fill:false,
            borderColor:"#007bff",
            lineTension:0.1
        }, {
            label: 'Children',
            data: [children1,children2,children3,children4,children5,children6,children7],
            type: 'line',
            // this dataset is drawn on top
            order: 2,
            //backgroundColor: 'rgba(77, 5, 232, 1)',
            backgroundColor: '#2c5db2',
            fill:false,
            borderColor: "#2c5db2",
            lineTension:0.1
            
        },{
            label: 'Elderly',
            data: [old1,old2,old3,old4,old5,old6,old7],
            type: 'line',
            // this dataset is drawn on top
            order: 3,
            //backgroundColor: 'rgba(240, 52, 52, 1)',
            backgroundColor: '#2f406a',
            fill:false,
            borderColor: "#2f406a",
            lineTension:0.1
        },{
            label: 'Total Population',
            data: [pop1,pop2,pop3,pop4,pop5,pop6,pop7],
            backgroundColor: "#24252a",
            // this dataset is drawn below
            order: 4
        },
    ],
        labels: [date1,date2,date3,date4,date5,date6,date7]
    },options:{}
    //options: options
});

}
