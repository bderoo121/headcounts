var margin = {top: 20, right: 20, bottom: 20, left: 19},
  width = 600 - margin.right - margin.left, // width
  height = 300 - margin.top - margin.bottom, // height
  cellSize = 50,
  year = 2014,
  day = d3.time.format("%w"),
  week = d3.time.format("%U"),
  percent = d3.format(".1%"),
  format = d3.time.format("%Y-%m-%d"),
  monthName = d3.time.format("%B"),
  months= d3.time.months(new Date(year, 0), new Date(year + 1, 0));

var svg = d3.select("#calendar").selectAll("svg")
  .data(months)
  .enter().append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .attr("class", "RdYlGn")
  .attr("class", "month")
  .append("g")
  .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");

var rect = svg.selectAll("rect.day")
  .data(function(d, i) { return d3.time.days(d, new Date(d.getFullYear(), d.getMonth()+1, 1)); })
  .enter().append("rect")
  .attr("class", "day")
  .attr("width", cellSize)
  .attr("height", cellSize)
  .attr("x", function(d) { return day(d) * cellSize; })
  .attr("y", function(d) { return (week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellSize; })
  .datum(format)
  .on("click", function(d){
    d3.select(".info").remove(); 
    console.log(d);      
    d3.select("#info").append("p").attr("class", "info").text(d);});


