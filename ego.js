document.addEventListener("DOMContentLoaded", function () {
  var startTime = performance.now();
  var degree_id = [];
  var ids = [];
  var nodes = [
    12557, 12562, 12566, 12569, 12572, 12574, 12575, 12688, 12737, 12740, 12753,
    12755, 12762, 12764, 12768, 12782, 12798, 12803, 12804, 12807, 12817, 12819,
    12825, 12835, 12852, 12856, 12832, 12863, 12865, 12866,
  ];

  var cy = (window.cy = cytoscape({
    container: document.getElementById("cy"),
    //initilisation options
    hideEdgesOnViewport: true,

    layout: {
      name: "cose-bilkent",
      randomize: true,
    },

    style: [
      {
        selector: "node",
        style: {
          visibility: function (ele) {
            if (nodes.includes(+ele.id()) == true) {
              return "visible";
            } else if (ele.id() == 12861) {
              return "visible";
            } else {
              return "hidden";
            }
          },
          "background-color": function (ele) {
            if (ele._private["data"]["id"] == 12861) {
              return "#f25f5c";
            } else {
              return "#247ba0";
            }
          },
          width: function (ele) {
            if (ele._private["data"]["id"] == 12861) {
              return 50;
            } else {
              return 20;
            }
          },
          height: function (ele) {
            if (ele._private["data"]["id"] == 12861) {
              return 50;
            } else {
              return 20;
            }
          },
          ["label"]: function (ele) {
            return ele.id();
          },
          "font-size": 20,
          "font-family": "Helvetica",
          "text-outline-color": "white",
          "text-outline-opacity": 0.9,
          "text-outline-width": 2,

          //"text-outline-opacity": 0.9,
          //"text-outline-width": 6,
          //"text-halign": "center",
          //"text-valign": "center",
        },
      },

      {
        selector: "edge",
        style: {
          "line-color": "grey",
          visibility: function (ele) {
            var source = ele._private["data"]["source"];
            var target = ele._private["data"]["target"];

            if (source == 12861 || target == 12861) {
              return "visible";
            } else {
              return "hidden";
            }
          },
          width: 0.5,
          "target-arrow-shape": "triangle-backcurve",
          "target-arrow-color": "grey",
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
