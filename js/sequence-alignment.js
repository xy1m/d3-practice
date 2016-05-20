//$(document).ready(function() {
/*Data*/
var raw = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var len = raw.length;
var count = 50;

var dataset = [];
for (var i = 0; i < count; i++) {
	var begin = Math.round(Math.random() * len);
	var end = Math.round(Math.random() * (len - begin));
	dataset.push({
		"index": begin,
		"end": end,
		"enzyme": "Trypsin",
		"sequence": raw.substring(begin, begin + end)
	});
}

/*Axis*/
var width = $('#container').width() || window.innerWidth;
var height = $('#container').height() || window.innerHeight;

//var wordWidth = width / len;
var padding = {
	top: 4
};
var margin = {
	top: 40,
	left: 40,
	bottom: 200,
	right: 40
}

var w = width - margin.left - margin.right;
var h = height - margin.top - margin.bottom;

var x = d3.scale.linear()
	.domain([0, len])
	.range([0, w])

var y = d3.scale.linear()
	.domain([0, count])
	.range([0, h]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("top")
	.ticks(len)
	.tickFormat(function(d) {
		return raw.charAt(d);
	});

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(count);

/*zoomable*/
var zoom =
	/*d3.behavior.zoom()
	.x(x)
	.scaleExtent([1, 10])
	.on("zoom", zoomed);*/
	d3.behavior.zoom()
	.x(x)
	.on("zoom", zoomed);

function zoomed() {
	svg.select(".x.axis").call(xAxis);
}

var barHeight = h / count;

var svg = d3.select("#container")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")").call(zoom);

svg.append("g")
	.attr("class", "x axis")
	.call(xAxis);

svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);

/*Rect*/
var rects = svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("data-toggle", "popover")
	.attr("data-title", function(d, i) {
		return d.enzyme;
	})
	.attr("data-content", function(d, i) {
		return "<p>" + d.sequence + "</p>" + "<p>something</p>";
	})
	.attr("fill", function(d, i) {
		return d.sequence.length > 10 ? "steelblue" : "darkgrey";
	})
	.attr("width", 0)
	.on("mouseover", function(d, i) {
		d3.select(this).attr("fill", "limegreen");
	})
	.on("mouseout", function(d, i) {
		d3.select(this).attr("fill", function(d, i) {
			return d.sequence.length > 10 ? "steelblue" : "darkgrey";
		});
	})
	.transition()
	.delay(500)
	.duration(1000)
	.ease("linear")
	.attr("x", function(d) {
		return x(d.index);
	})
	.attr("y", function(d, i) {
		return i * ( /*padding.top + */ barHeight);
	})
	.attr("width", function(d) {
		//return linear(d.sequence.length);
		return x(d.sequence.length);
	})
	.attr("height", barHeight);

$('[data-toggle="popover"]').popover({
	container: 'body',
	placement: 'bottom',
	html: 'false',
	template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title text-info"></h3><div class="popover-content"></div></div>',
	trigger: 'hover'
});


//})