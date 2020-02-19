function plainDonut(div,label,datas){

    var ctx = document.getElementById(div).getContext('2d');
    var chart = new Chart(ctx, {  
			type: 'doughnut',
            data: {
                labels: ["YES","NO"],
                datasets: datas
            },
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: label
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		
});
}

