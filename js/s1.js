//Data
var raw = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var rawarr = raw.split('');
var len = raw.length;
var count = 30;

var dataset = [];
for (var i = 0; i < count; i++) {
	var begin = Math.round(Math.random() * len);
	var end = Math.round(Math.random() * (len - begin));
	/*	var begin = i % len;
		var end = 3;*/
	dataset.push({
		"index": begin,
		"end": end,
		"enzyme": "Trypsin",
		"sequence": raw.substring(begin, begin + end)
	});
}

// constants
var padding = {
	top: 4
}

var margin = {
	top: 40,
	left: 40,
	bottom: 200,
	right: 40
}

var width = $('#container').width() || window.innerWidth;
var height = $('#container').height() || window.innerHeight;

var w = width - margin.left - margin.right;
var h = height - margin.top - margin.bottom;
var barHeight = 10;
//svg
var svg = d3.select("#container")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//x
var x = d3.scale.linear()
	.domain([0, len])
	.range([0, w])

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("top")
	.ticks(len)
	.tickFormat(function(d) {
		return rawarr[d];
	});

svg.append("g")
	.attr("class", "x axis")
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.call(xAxis);
//y
/*var y = d3.scale.linear()
	.domain([0, count])
	.range([0, h]);

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(count);

svg.append("g")
	.attr("class", "y axis")
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.call(yAxis);*/

//area
svg
	.append('rect')
	.attr('class', 'zoom-area')
	.attr('y', margin.top)
	.attr('x', margin.left)
	.attr('height', h)
	.attr('width', w);

var barSetPosition = function(s, i, seq_index, seq_len) {
	s.attr('x', function() {
			return margin.left + x(seq_index);
		})
		.attr('width', function() {
			return x(seq_len);
		})
		.attr('height', barHeight);
};

bars = svg
	.append('g')
	.attr('class', 'bars');

bars.selectAll('g.bars-group')
	.data(dataset)
	.enter()
	.append('g')
	.each(function(d, i) {
		var el = d3.select(this);
		el.attr('class', 'info-group')
			.attr('transform', function() {
				return 'translate(' + margin.left + ',' + (margin.top + i * barHeight) + ')';
			});
		el.append('rect')
			.attr('class', function(d, i) {
				var showGrey = d.sequence.length < 5;
				return 'bar ' + (showGrey ? "bar-grey" : "");
			})
			/*.attr("stroke", "grey")
			.attr("stroke-width", function(d) {
				return 8;
			})*/
			.attr("data-toggle", "popover")
			.attr("data-title", function(d, i) {
				return d.enzyme;
			})
			.attr("data-content", function(d, i) {
				return "<p>" + d.sequence + "</p>" + "<p>something</p>";
			}).on("mouseover", function(d, i) {
				d3.select(this).classed("bar-green", true);
			})
			.on("mouseout", function(d, i) {
				d3.select(this).classed("bar-green", false);
			})
			.call(function(s) {
				barSetPosition(s, i, d.index, d.sequence.length);
			});
	});

var zoom = d3.behavior.zoom()
	.x(x)
	.scaleExtent([1, 10])
	.on("zoom", function() {
		var t = zoom.translate(),
			tx = t[0],
			ty = t[1],
			scale = zoom.scale();

		tx = Math.min(tx, 0);

		tx = Math.max(tx, w + margin.left - (w + margin.left) * scale);

		zoom.translate([tx, ty]);
		svg
			.select('.bars')
			.attr("transform", "translate(" + tx + ",0)");

		svg.selectAll('.bar')
			.attr('x', function(d) {
				// (canvasH + margin.top) * scale - (yScale(0) - yScale(d.ib));
				return margin.left + (x(d.index) - x(0)) * scale;
			})
			.attr('width', function(d) {
				return Math.max(0, x(d.sequence.length) * scale);
			})
			.attr('height', barHeight);

		svg.select('.x.axis').call(xAxis);
	});

svg.call(zoom);

/*var rects = svg.selectAll("rect")
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
		return i * ( barHeight);
	})
	.attr("width", function(d) {
		//return linear(d.sequence.length);
		return x(d.sequence.length);
	})
	.attr("height", barHeight);*/

$('[data-toggle="popover"]').popover({
	container: 'body',
	placement: 'bottom',
	html: 'false',
	template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title text-info"></h3><div class="popover-content"></div></div>',
	trigger: 'hover'
});