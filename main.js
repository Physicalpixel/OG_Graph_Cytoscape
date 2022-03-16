document.addEventListener("DOMContentLoaded", function () {
  var startTime = performance.now();
  var srcRange;
  var degree_arr = [];
  var dstRange = [100, 600]; // range of node size for thevalues to be mapped to
  //this function, convertToRange, maps one range of values to another range of values.  eg. mapping 0-10 to 0-100.
  //this is required to map scores to the size of the nodes.

  function convertToRange(value, srcRange, dstRange) {
    // value is outside source range return
    if (value < srcRange[0] || value > srcRange[1]) {
      return NaN;
    }
    var srcMax = srcRange[1] - srcRange[0],
      dstMax = dstRange[1] - dstRange[0],
      adjValue = value - srcRange[0];
    return (adjValue * dstMax) / srcMax + dstRange[0];
  }

  var cy = (window.cy = cytoscape({
    container: document.getElementById("cy"),
    //initilisation options
    hideEdgesOnViewport: true,

    layout: {
      name: "cose-bilkent",
      randomize: true,
      animate: false,
    },

    style: [
      {
        selector: "node",
        style: {
          "background-color": function (ele) {
            //assigning color as per heirarchy
            if (ele._private["data"]["hierarchy_level"] == 1) {
              return "#355c7d"; //blue
            } else if (ele._private["data"]["hierarchy_level"] == 2) {
              return "#6e5b7b"; //purple
            } else if (ele._private["data"]["hierarchy_level"] == 3) {
              return "#f67280"; //pink
            } else if (ele._private["data"]["hierarchy_level"] == 4) {
              return "#f8b195"; //orange
            }
          },

          width: function (ele) {
            var score = ele.indegree(); // indegree value
            degree_arr.push(ele.indegree()); //adding indegree values of each node to an array to get the max and min value
            //this min and max value can be then mapped to a range of lowest node size to largest node size.
            var min_score = Math.min.apply(Math, degree_arr); // least indegree of the network
            var max_score = Math.max.apply(Math, degree_arr); // largest indegree of the network
            srcRange = [min_score, max_score];

            return convertToRange(score, srcRange, dstRange);
          },
          height: function (ele) {
            degree_arr.push(ele.indegree());
            var min_score = Math.min.apply(Math, degree_arr);
            var max_score = Math.max.apply(Math, degree_arr);
            srcRange = [min_score, max_score];
            var score = ele.indegree();
            return convertToRange(score, srcRange, dstRange);
          },

          ["label"]: function (ele) {
            return ele.id();
          },

          "font-size": function (ele) {
            //to display scores
            var score = ele.indegree();
            if (score < 17) {
              return 0;
            } else {
              return 90;
            }
          },
          "font-family": "Helvetica",
          //"border-width": 5,
          "border-color": "white",
          "border-style": "double",
          "border-opacity": 0.5,
          "text-halign": "center",
          "text-valign": "center",
          "text-outline-color": "white",
          "text-outline-opacity": 1,
          "text-outline-width": 10,
          "text-outline-color": "white",
        },
      },

      {
        selector: "edge",
        style: {
          "line-color": "grey",
          width: 1,
          opacity: 1,
          "target-arrow-shape": "triangle-backcurve",
          "target-arrow-color": "grey",
          "arrow-scale": 3,
          "curve-style": "bezier",
          "line-opacity": 1,
        },
      },
    ],

    elements: fetch("main_combined.json")
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        return data["graph"]["elements"];
      }),

    ready: function () {
      console.log("Rendered CY");
      var endTime = performance.now();
      console.log(
        `Call to doSomething took ${endTime - startTime} milliseconds`
      );
    },
  }));
});
