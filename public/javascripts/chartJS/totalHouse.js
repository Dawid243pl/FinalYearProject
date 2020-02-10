function housing_totalPieChartJS(div,label1,data1){
   
    console.log(data1);
    console.log("div",div);
    var ctx = document.getElementById(div).getContext('2d');
    var chart = new Chart(ctx, {  
			type: 'doughnut',
			data: {
				datasets: [{
					data: [
                        data1,
					],
					backgroundColor: [
						"red",
					],
					//label: 'Dataset 1'
				}],
				labels: [
					data1,
				]
			},
			options: {
				responsive: true,
				//legend: {
			//		position: 'top',
			//	},
				title: {
					display: false,
					text: '% Type of house'
				},
				animation: {
					animateScale: true,
					animateRotate: true

                },
                tooltips: {
                    enabled: true,
                },
                legend: {
                    display: false,
                },

			}
		
});
}

