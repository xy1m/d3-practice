var barSetPosition = function(s, value, i) {
  s
    .attr('y', function() {
      return canvasH + margin.top - (yScale(0) - yScale(value));
    })
    .attr('height', function() {
      return yScale(0) - yScale(value);
    })
    .attr('width', barScale.rangeBand());
};

// scales for bar
var barScale = d3.scale.ordinal()
  .domain(d3.range(dataset.length))
  .rangeRoundBands([0, canvasW + margin.right], 0.3, 0.1);

// groups
bars = svg
  .append('g')
  .attr('class', 'bars');

bars
  .selectAll('g.bars-group')
  .data(dataset)
  .enter()
  .append('g')
  .each(function(d, i) {
    var el = d3.select(this);

    el
      .attr('class', 'info-group')
      .attr('transform', function() {
        return 'translate(' + (barScale(i) + margin.left) + ', 0)';
      });

    // bars
    el
      .append('rect')
      .attr('class', 'bar')
      .call(function(s) {
        barSetPosition(s, d.ib, i);
      });
  });

var zoom = d3.behavior.zoom()
  .y(yScale)
  .scaleExtent([1, 2])
  .on("zoom", function() {
    var t = zoom.translate(),
      tx = t[0],
      ty = t[1],
      scale = zoom.scale();

    ty = Math.min(ty, 0);

    ty = Math.max(ty, canvasH + margin.top - (canvasH + margin.top) * scale);

    zoom.translate([tx, ty]);

    svg
      .select('.bars')
      .attr("transform", "translate(0," + ty + ")");

    svg.selectAll('.bar')
      .attr('y', function(d) {
        return (canvasH + margin.top) * scale - (yScale(0) - yScale(d.ib));
      })
      .attr('height', function(d) {
        var height = (yScale(0) - yScale(d.ib)) - (canvasH + margin.top) * (scale - 1) - ty;

        if (height < 0) {
          height = 0;
        }

        return height;
      })
      .attr('width', barScale.rangeBand());

    svg.select('.y.axis').call(yAxis);
  });

svg.call(zoom);