var data = [{
  "mes": 1,
  "dez_percentil": 19.34,
  "mediana": 67.9,
  "noventa_percentil": 89.86
}, {
  "mes": 2,
  "dez_percentil": 20.32,
  "mediana": 65.2,
  "noventa_percentil": 89.14
}, {
  "mes": 3,
  "dez_percentil": 20.95,
  "mediana": 78.7,
  "noventa_percentil": 100
}, {
  "mes": 4,
  "dez_percentil": 27.14,
  "mediana": 87.1,
  "noventa_percentil": 100
}, {
  "mes": 5,
  "dez_percentil": 27.16,
  "mediana": 85.1,
  "noventa_percentil": 102.04
}, {
  "mes": 6,
  "dez_percentil": 26,
  "mediana": 83.5,
  "noventa_percentil": 100.88
}, {
  "mes": 7,
  "dez_percentil": 24.88,
  "mediana": 81.7,
  "noventa_percentil": 100.32
}, {
  "mes": 8,
  "dez_percentil": 23.68,
  "mediana": 79.9,
  "noventa_percentil": 99.24
}, {
  "mes": 9,
  "dez_percentil": 22.36,
  "mediana": 77.8,
  "noventa_percentil": 96.82
}, {
  "mes": 10,
  "dez_percentil": 20.92,
  "mediana": 74,
  "noventa_percentil": 94.12
}, {
  "mes": 11,
  "dez_percentil": 19.62,
  "mediana": 70.4,
  "noventa_percentil": 91.34
}, {
  "mes": 12,
  "dez_percentil": 19.06,
  "mediana": 67.3,
  "noventa_percentil": 89.42
}];

    var margin = {top: 20, right: 15, bottom: 60, left: 60}
      , width = 960 - margin.left - margin.right
      , height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
              .domain([d3.min(data, function(d) { return d["dez_percentil"]; })-3, d3.max(data, function(d) { return d["dez_percentil"]; })+3])
              .range([ 0, width ]);

    var y = d3.scaleLinear()
    	      .domain([d3.min(data, function(d) { return d["noventa_percentil"]; })-3, d3.max(data, function(d) { return d["noventa_percentil"]; })+3])
    	      .range([ height, 0 ]);

    var col = d3.scaleLinear()
            .domain([d3.min(data, function(d) { return d["mediana"]; }), d3.max(data, function(d) { return d["mediana"]; })])
            .range(["brown", "steelblue"]);

    var chart = d3.select('body')
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class', 'chart')

    var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')

    // draw the x axis
    var xAxis = d3.axisBottom(x);

    main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

    // draw the y axis
    var yAxis = d3.axisLeft(y);

    main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

    var g = main.append("svg:g");

    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return x(d["dez_percentil"]); } )
          .attr("cy", function (d) { return y(d["noventa_percentil"]); } )
          .attr("r", 10)
          .style("fill", function (d) { return col(d["mediana"]); } )
