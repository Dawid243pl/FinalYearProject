function housing_ownedPieChartJS(div,label1,label2,label3,data1,data2,data3){

    var ctx = document.getElementById(div).getContext('2d');
    var chart = new Chart(ctx, {  
			type: 'doughnut',
			data: {
				datasets: [{
					data: [
                        data1,
                        data2,
                        data3
					],
					backgroundColor: [
						"red",
						"orange",
						"yellow",
					],
					label: 'Dataset 1'
				}],
				labels: [
					label1,
					label2,
					label3,
				]
			},
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: '% Owned By'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		
});
}

