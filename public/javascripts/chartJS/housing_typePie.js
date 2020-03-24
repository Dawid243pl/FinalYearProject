function housing_typePieChartJS(div,label1,label2,label3,label4,data1,data2,data3,data4){
	
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
						"#24252a",
						"#2f406a",
                        "#2c5db2",
                        "#007bff",
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
					text: '% Type of house'
				},
				animation: {
					animateScale: true,
					animateRotate: true
                },
                
			}
		
});
}

