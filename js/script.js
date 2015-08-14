var margin = {top: 20, right: 20, bottom: 20, left: 19},
  width = 600 - margin.right - margin.left, // width
  height = 325 - margin.top - margin.bottom, // height
  cellSize = 50,
  year = 2014,
  day = d3.time.format("%w"),
  week = d3.time.format("%U"),
  percent = d3.format(".1%"),
  format = d3.time.format("%Y-%m-%d"),
  monthName = d3.time.format("%B"),
  months= d3.time.months(new Date(year, 0), new Date(year + 1, 0)), 
  times = ["8:00","9:00","10:00","11:00","12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
  ids = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"]
 
var svg = d3.select("#calendar").selectAll("svg")
  .data(months)
  .enter().append("svg")
  .attr("width", width + margin.right + margin.left)
  .attr("height", height + margin.top + margin.bottom)
  .attr("class", "RdYlGn")
  .attr("class", "month")
  .append("g")
  .attr("transform", "translate(" + (margin.left) + "," + (margin.top) + ")");

// load json data 
var data = {}; 

d3.json("data/data.json", function(error, json) {
  if (error) return console.warn(error);
  data = json; 
});  

//build bar chart 
//var bar_data = [4, 8, 15, 16, 23, 42];

var bar_x = {}
for( var i in times){
    bar_x[times[i]] = 0 ;
}

var bar_data = bar_data_prep(bar_x);

//var bar_data = [4, 8, 15, 16, 23, 42];

var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .domain([0, 125])
    .range([0, width]);

var y = d3.scale.ordinal()
    .domain(times)
    .rangeRoundBands([0, barHeight*17], .1);

var chart = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", barHeight * 18);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");   

var bar = chart.selectAll("g")
    .data(bar_data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(60," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1)
    .attr("class", "bar");

bar.append("text")
    .attr("x", function(d) { return x(d) + 15; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });

chart.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(60, 320)")
    .call(xAxis);

chart.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(50, -20)")
    .call(yAxis);


// build calendar - rect
var rect = svg.selectAll("rect.day")
  .data(function(d, i) { 
      d = d3.time.days(d, new Date(d.getFullYear(), d.getMonth()+1, 1));
      return d; 
  })
  .enter().append("rect")
  .attr("class", "day")
  .attr("width", cellSize)
  .attr("height", cellSize)
  .attr("x", function(d) { return day(d) * cellSize; })
  .attr("y", function(d) { return (week(d) - week(new Date(d.getFullYear(),d.getMonth(),1))) * cellSize; })
  .datum(format)
  .on("click", function(d){
    d3.select(".active").attr("class", "day");
    d3.selectAll(".info").remove();    
    d3.select(this).attr("class", "active")  
    d3.select("#info").append("p").attr("class", "info").text(d);
    d3.select("#info").append("ul").attr("class", "info")
    
    update = bar_data_prep(data[d]);
    console.log(update);
    bar.data(update); 
    bar.selectAll("rect").remove(); 
    bar.selectAll("text").remove(); 
    bar.append("rect")
    .attr("width", x)
    .attr("height", barHeight - 1)
    .attr("class", "bar");
    bar.append("text")
    .attr("x", function(d) { return x(d) + 15; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
  });

function bar_data_prep(x){
  var bar_data = []
  for( var i in x){
    bar_data.push(x[i]);
  }
  return bar_data
}
