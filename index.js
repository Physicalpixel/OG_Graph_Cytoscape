document.addEventListener("DOMContentLoaded", function () {
  var startTime = performance.now();
  var min_score;
  var max_score;
  var srcRange;
  var degree_arr = [];
  var dstRange = [100, 400];
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
          "background-color": "#a46c64",

          width: function (ele) {
            degree_arr.push(ele.indegree());
            var min_score = Math.min.apply(Math, degree_arr);
            var max_score = Math.max.apply(Math, degree_arr);
            srcRange = [min_score, max_score];
            var score = ele.indegree();
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

          "font-size": 50,
          "font-family": "Helvetica",
          //"border-width": 5,
          "border-color": "white",
          "border-style": "double",
          "border-opacity": 0.5,
          "text-halign": "center",
          "text-valign": "center",
          "text-outline-color": "white",
          "text-outline-opacity": 1,
          "text-outline-width": 5,
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
          "arrow-scale": 2.5,
          "curve-style": "bezier",
          "line-opacity": 1,
        },
      },
    ],

    elements: fetch("main_leadership_energy.json")
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
