var raw = "ABCDEFGHIJKLMNABCDEFGHIJKLMNABCDEFGHIJKLMNABCDEFGHIJKLMNABCDEFGHIJKLMNABCDEFGHIJKLMNABCDEFGHIJKLMNABCDEFGHIJKLMN"

var dataset = [];

var len = raw.length;
for (var i = 0; i < 25; i++) {
	var begin = Math.round(Math.random() * len);
	var end = Math.round(Math.random() * (len - begin));
	dataset.push({
		"index": begin,
		"end": end,
		"sequence": raw.substring(begin, begin + end)
	});
}

var w = 800;
var h = 600;
var padding = 5;
var bar_height = 20;

var xScale = d3.scale.linear()
	.domain([0, 112])
	.range([100, 800]);


var svg = d3.select("body")
	.append("svg")
	.attr("width", w)
	.attr("height", h);

var rects = svg.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("fill", function(d, i) {
		return "teal";
	}).on("mouseover", function(d, i) {
		d3.select(this).attr("fill", "yellow");
	})
	.on("mouseout", function(d, i) {
		d3.select(this)
			.transition()
			.duration(500)
			.attr("fill", "teal");
	})
	.attr("width", 0)
	.transition()
	.delay(500)
	.duration(2000)
	.ease("bounce")
	.attr("x", function(d) {
		return d.index;
	})
	.attr("y", function(d, i) {
		return i * (padding + bar_height) + padding;
	})
	.attr("width", function(d) {
		return xScale(d.sequence.length);
	})
	.attr("height", bar_height)
	.attr("stroke", "grey")
	.attr("stroke-width", function(d) {
		return padding / 2;
	});
