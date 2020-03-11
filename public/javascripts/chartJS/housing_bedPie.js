function housing_bedPieChartJS(div,label1,label2,label3,label4,data1,data2,data3,data4){
	
    var ctx = document.getElementById(div).getContext('2d');
    var chart = new Chart(ctx, {  
			type: 'doughnut',
			data: {
				datasets: [{
					data: [
                        data1,
                        data2,
                        data3,
                        data4
					],
					backgroundColor: [
						"red",
						"orange",
                        "yellow",
                        "black",
					],
					label: 'Dataset 1'
				}],
				labels: [
					label1,
					label2,
                    label3,
                    label4,
				]
			},
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: '% Bedroom'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		
});
}

