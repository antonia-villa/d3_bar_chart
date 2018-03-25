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

g.append("text")
	.attr("tranform", "rotate(90)")
	.attr("y", 6)
	.attr("dy", "0.71em")
	.attr("text-anchor", "end")
	.text("Population")


function draw() {
	var bounds = svg.node().getBoundingClientRect(),
		width = bounds.width - margin.left - margin.right,
		height = bounds.height - margin.top - margin.bottom;

	x.rangeRound([0,width]);
	y.rangeRound([height,0]);

	g.select(".axis--x")
	 .attr("transform", "translate(0,"+height+")")
	 .call(d3.axisBottom(x));

	g.select(".axis--y")
	 .call(d3.axisLeft(y).ticks(10))

	 var bars = g.selectAll(".bar")
	 .data(data);

	 // Enter the data 
	 bars.enter()
	 	.append("rect")
	 	.attr("class", "bar")
	 	.attr("x", function(d){ return x(d.continent)})
	 	.attr("y", function(d){ return y(d.population)})
	 	.attr("width", x.bandwidth())
	 	.attr("height", function(d){ return height - y(d.population)});

	 bars.exit()
	 .remove()	
}

function loadData(data){
	x.domain(data.map(function(d){ return d.continent}))
	y.domain([0,d3.max(data,function(d){ return d.population})]);

draw();
}

// Start Everything up
window.addEventListener("resize", draw)
loadData(jsonData);
