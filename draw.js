// worked with project group: Zack Lim, Morgan Dubrow

var data = [];
var USER_SEX = "2",
    USER_RACESIMP = "1",
    USER_AGEGRP = "2";

var category_colors = {
    // TODO implement this based on what we did in class
    "married": "#5B7BE9",
    "children": "#E0D22E",
    "healthcare": "#2CCEF6",
    "college": "#FB7F23",
    "employed": "#D63CA3",
    "selfemp": "#c38014",
    "publictrans": "#E24062",
    "income_moremed": "#5BB923",
    "inpoverty": "#555",
    "isveteran": "#B190D0",
    "bornoutus": "#bcc832",
    "diffmovecog": "#ee7b9c",
    "diffhearvis": "#f299b3",
    "widowed": "#01d99f",
}

$(document).ready(function () {
    loadData();
    wireButtonClickEvents();
});

// Loads the CSV file
function loadData() {
    // load the demographics.csv file
    // assign it to the data variable, and call the visualize function by first filtering the data
    // call the visualization function by first findingDataItem
    d3.csv("data/demographics.csv", (d) =>
    {
      data = d;
      data.forEach((item) => {
        // variables to integers
        item.married = parseInt(item.married);
        item.children = parseInt(item.children);
        item.healthcare = parseInt(item.healthcare);
        item.college = parseInt(item.college);
        item.employed = parseInt(item.employed);
        item.selfemp = parseInt(item.selfemp);
        item.publictrans = parseInt(item.publictrans);
        item.income_moremed = parseInt(item.income_moremed);
        item.inpoverty = parseInt(item.inpoverty);
        item.isveteran = parseInt(item.isveteran);
        item.bornoutus = parseInt(item.bornoutus);
        item.diffmovecog = parseInt(item.diffmovecog);
        item.diffhearvis = parseInt(item.diffhearvis);
        item.widowed = parseInt(item.widowed);
        item.total = parseInt(item.total);
      });
      visualizeSquareChart(findDataItem());
    });
}

// Finds the dataitem that corresponds to USER_SEX + USER_RACESIMP + USER_AGEGRP variable values
function findDataItem() {
    // you will find the SINGLE item in "data" array that corresponds to
    //the USER_SEX (sex), USER_RACESIMP (racesimp), and USER_AGEGRP(agegrp) variable values
    //HINT: uncomment and COMPLETE the below lines of code

    // initializing counts to 0
    var full_data = {
      "married":0,
      "children":0,
      "healthcare":0,
      "college":0,
      "employed":0,
      "selfemp":0,
      "publictrans":0,
      "income_moremed":0,
      "inpoverty":0,
      "isveteran":0,
      "bornoutus":0,
      "diffmovecog":0,
      "diffhearvis":0,
      "widowed":0,
      "total": 0
    }

    // initializing row count to 0
    var row_count = 0;
    // looping through, getting sum in each category
    var item = data.filter(function (d)
    {
      full_data["married"] += d.married;
      full_data["children"] += d.children;
      full_data["healthcare"] += d.healthcare;
      full_data["college"] += d.college;
      full_data["employed"] += d.employed;
      full_data["selfemp"] += d.selfemp;
      full_data["publictrans"] += d.publictrans;
      full_data["income_moremed"] += d.income_moremed;
      full_data["inpoverty"] += d.inpoverty;
      full_data["isveteran"] += d.isveteran;
      full_data["bornoutus"] += d.bornoutus;
      full_data["diffmovecog"] += d.diffmovecog;
      full_data["diffhearvis"] += d.diffhearvis;
      full_data["widowed"] += d.widowed;
      full_data["total"] += d.total;
      row_count += 1;
    });

    if (item.length == 1){
      return item[0];
    }

    // getting mean for each category by dividing the total from above by the number of rows
    full_data["married"] = parseInt(full_data["married"]/row_count);
    full_data["children"] = parseInt(full_data["children"]/row_count);
    full_data["healthcare"] = parseInt(full_data["healthcare"]/row_count);
    full_data["college"] = parseInt(full_data["college"]/row_count);
    full_data["employed"] = parseInt(full_data["employed"]/row_count);
    full_data["selfemp"] = parseInt(full_data["selfemp"]/row_count);
    full_data["publictrans"] = parseInt(full_data["publictrans"]/row_count);
    full_data["income_moremed"] = parseInt(full_data["income_moremed"]/row_count);
    full_data["inpoverty"] = parseInt(full_data["inpoverty"]/row_count);
    full_data["isveteran"] = parseInt(full_data["isveteran"]/row_count);
    full_data["bornoutus"] = parseInt(full_data["bornoutus"]/row_count);
    full_data["diffmovecog"] = parseInt(full_data["diffmovecog"]/row_count);
    full_data["diffhearvis"] = parseInt(full_data["diffhearvis"]/row_count);
    full_data["widowed"] = parseInt(full_data["widowed"]/row_count);

    return full_data;
}

//Pass a single dataitem to this function by first calling findDataItem. visualizes square chart
function visualizeSquareChart(item) {
    // visualize the square plot per attribute in the category_color variable
    //HINT: you will iterate through the category_colors variable and draw a square chart for each item
    var population = d3.select("#n")
    population.text(item.total);

    // setting up multiple charts and titles
    var fields = d3.keys(category_colors)
    fields.forEach((v, i) => {
      div = d3.select("#chart1")
              .append("div")
              .attr("width", 140)
              .attr("height", 180)
              .style("float", "left")

      text = div.append("h6").text(v)

      svg = div.append("svg")
			       .attr("width", 130)
			       .attr("height", 130)


		rectWidth = 12
    rectHeight = 12

    // the grey/white squares on top
		top_rects = svg.selectAll(".top_rects")
			         .data(d3.range(100 - item[v]))
			         .enter()
		           .append("rect")
			         .attr("x", (d, i) => rectWidth * (d % 10))
			         .attr("y", (d, i) => rectWidth * Math.floor(d / 10))
               .attr("height", rectHeight)
               .attr("width", rectWidth)
               .attr("stroke", "white")
               .attr("fill", "#eaeaea")
               .attr("class", "top_rects")
      // the colored squares on the bottom, iterating through the dict from above with colors
      colored = svg.selectAll(".colored")
                .data(d3.range(100 - item[v], 100))
                .enter()
                .append("rect")
                .attr("x", (d, i) => rectWidth * (d % 10))
                .attr("y", (d, i) => rectWidth * Math.floor(d / 10))
                .attr("height", rectHeight)
                .attr("width", rectWidth)
                .attr("stroke", "white")
                .attr("class", "colored")
                .attr("fill", category_colors[v]);
    });
}

//EXTRA CREDITS
function wireButtonClickEvents() {
    // We have three groups of button, each sets one variable value.
    //The first one is done for you. Try to implement it for the other two groups

    //SEX
    d3.selectAll("#sex .button").on("click", function () {
        USER_SEX = d3.select(this).attr("data-val");
        d3.select("#sex .current").classed("current", false);
        d3.select(this).classed("current", true);
        $("#chart1").empty();
        // TODO: find the data item and invoke the visualization function
    });
    // RACE

    //AGEGROUP

}
