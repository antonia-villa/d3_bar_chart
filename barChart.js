var svg = d3.select("svg")
	margin = {top:20, right: 20, bottom: 30, left: 40},
	x = d3.scaleBand().padding(0.1)
	y = d3.scaleLinear(),
	data = undefined;



var g = svg.append("g")
	.attr("transform", "translate("+ margin.left+","+margin.top+")");

g.append("g")
	.attr("class", "axis axis--x")

g.append("g")
	.attr("class", "axis axis--y")



function draw(data) {
	var bounds = svg.node().getBoundingClientRect(),
		width = bounds.width - margin.left - margin.right,
		height = bounds.height - margin.top - margin.bottom;

	svg.append("text")
	.attr("x", (width/2))
	.attr("y", 0+(margin.top))
	.attr("text-anchor", "middle")
	.style("font-size", "26px")
	.style("font-color", "black")
	.text("Population Predictions")

	x.rangeRound([0,width]);
	y.rangeRound([height,0]);

	g.select(".axis--x")
	 .attr("transform", "translate(0,"+height+")")
	 .call(d3.axisBottom(x));

	g.select(".axis--y")
	 .call(d3.axisLeft(y).ticks(10))
	 
	 var bars = g.selectAll(".bar")
	 	.data(data)
	 // Enter data
	 bars
	 	.enter().append("rect")
	 	.attr("class", "bar")
	 	.attr("x", function(d){ return x(d.continent)})
	 	.attr("y", function(d){ return y(d.population)})
	 	.attr("width", x.bandwidth())
	 	.attr("height", function(d){ return height - y(d.population)});

	 bars.exit()
	 .remove()	
}

function loadData(){
	d3.json("rawData.json", function(error, data){
		data.forEach(function(d){
			d.continent = d.continent;
			d.population = +d.population;
		})

	x.domain(data.map(function(d){ return d.continent}))
	y.domain([0,d3.max(data,function(d){ return d.population})]);
	
	draw(data);
	})
}

// Start Everything up
window.addEventListener("resize", draw)
loadData();
