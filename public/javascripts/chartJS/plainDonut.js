function plainDonut(div,label,datas){

	console.log(datas[0].data[0]);
	console.log(datas);

	if(datas[0].data[0] != null){

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
	}else{
	
		var divs = document.getElementById("no-rating");

		divs.innerHTML = ' '
		divs.innerHTML += 'There are no ratings to display for this ward yet'
                         

	}
}

