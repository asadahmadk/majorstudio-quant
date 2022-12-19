
// set the dimensions and margins of the graph
const margin = { top: 20, right: 30, bottom: 30, left: 60 },
    width = 1150 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;


// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("style", "outline: thin solid black;")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


//Read the data
d3.csv("https://raw.githubusercontent.com/asadahmadk/MajorStudio1/main/quantativeproject/data.csv").then(function (data) {
    // Add X axis
    const x = d3.scaleLinear()
        .domain([25, 75])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));


    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
    // svg.append("g")
    //     .call(d3.axisLeft(y));


    // Add dots
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
        .attr("cx", function (d) { return x(d.Value); })
        .attr("cy", function (d) { return y(d.GeoAreaCode / 10); })
        .attr("r", 0.1)
        .style("fill", "#69b3a2")

    var gdots = svg.selectAll("g.dot")
        .data(data)
        .enter().append('g');

    gdots.append("circle")
        .attr("class", "dot")
        .attr("r", function (d) {
            return d.r;
        })
        .attr("cx", function (d) {
            return x(d.Value);
        })
        .attr("cy", function (d) {
            return y(d.GeoAreaCode / 10);
        })
        .style("fill", function (d) {
            return d.c;
        });
    gdots.append("text").text(function (d) {
        return d.GeoAreaName;
    })
        .attr("x", function (d) {
            return x(d.Value);
        })
        .attr("y", function (d) {
            return y(d.GeoAreaCode / 10);
        }
        );

}
)
function makeGrid() {
    svg.insert("g", '#scatterplot')
        .attr("class", "grid grid-y")
        .call(y
            .tickSize(-width)
            .tickFormat(''));

    svg.selectAll('.grid')
        .selectAll('line')
        .attr('stroke', 'lightgray');
}







