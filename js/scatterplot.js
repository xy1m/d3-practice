var dataset = [];
var numDataPoints = 50;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
  var newNumber1 = Math.round(Math.random() * xRange);
  var newNumber2 = Math.round(Math.random() * yRange);
  dataset.push([newNumber1, newNumber2]);
}


var w = 600;
var h = 300;
var barPadding = 1;
var padding = 30;
var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var xScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {
    return d[0];
  })])
  .range([padding, w - padding * 2]);
  
var yScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {
    return d[1];
  })])
  .range([h - padding, padding]);

var rScale = d3.scale.linear()
  .domain([0, d3.max(dataset, function(d) {
    return d[1];
  })])
  .range([2, 5]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom");
var yAxis = d3.svg.axis()
  .scale(yScale)
  .orient("left")
  .ticks(5);
svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) {
    return xScale(d[0]);
  })
  .attr("cy", function(d) {
    return yScale(d[1]);
  })
  .attr("r", function(d) {
    return Math.sqrt(h - d[1]);
  }).attr("r", function(d) {
    return rScale(d[1]);
  });;



svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text").attr("x", function(d) {
    return xScale(d[0]);
  })
  .attr("y", function(d) {
    return yScale(d[1]);
  }).attr("font-family", "sans-serif")
  .attr("font-size", "11px")
  .attr("fill", "red")
  .text(function(d) {
    return d[0] + "," + d[1];
  });

svg.append("g").attr("class", "axis").attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);
svg.append("g")
  .attr("class", "axis")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);