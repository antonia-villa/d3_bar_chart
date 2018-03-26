var donut = donutChart()
	.width(960)
	.height(500)
	.cornerRadius(3) // sets how rounded the corners are on each slice
	.padAngle(0.015) // dictates the gap between slices
	.variable('population')
	.category('continent')

function loadData(){
	d3.json('rawData.json', function(error, data){
		if(error) throw error;
		console.log(data)
		d3.select('#chart')
			.datum(data)
			.call(donut)
	})
}

// Start Everything up

loadData();