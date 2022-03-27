document.addEventListener("DOMContentLoaded", function () {
  var startTime = performance.now();

  var cy = (window.cy = cytoscape({
    container: document.getElementById("cy"),
    //initilisation options
    hideEdgesOnViewport: true,

    layout: {
      name: "fcose",
    },

    style: [
      {
        selector: "node",
        style: {
          "background-color": function (ele) {
            var risk = ele._private["data"]["risk"];
            console.log(risk);
            if (risk == "High Risk") {
              return "#c70039";
            } else if (risk == "Medium Risk") {
              return "#ff5733";
            } else {
              return "#ffc300";
            }
          },
          width: function (ele) {
            if (ele._private["data"]["hierarchy_level"] == 1) {
              return 100;
            } else if (ele._private["data"]["hierarchy_level"] == 2) {
              return 50;
            } else {
              return ele._private["data"]["hierarchy_level"] * 11;
            }
          },
          height: function (ele) {
            if (ele._private["data"]["hierarchy_level"] == 1) {
              return 100;
            } else if (ele._private["data"]["hierarchy_level"] == 2) {
              return 50;
            } else {
              return ele._private["data"]["hierarchy_level"] * 11;
            }
          },
          ["label"]: function (ele) {
            return ele.id();
          },

          "font-size": 12,
          "font-family": "Helvetica",
          "border-width": 5,
          "border-color": "white",
          //"border-style": "double",
          "border-opacity": 0.5,
          "text-outline-color": "white",
          "text-outline-opacity": 0.9,
          "text-outline-width": 4,
          "text-outline-color": "white",
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
          width: 0.5,
          opacity: 0.6,
          "target-arrow-shape": "triangle-backcurve",
          "target-arrow-color": "grey",
          "curve-style": "bezier",
          "line-opacity": 1,
          /*"arrow-scale": function (ele) {
              var ID = ele._private["data"]["target"];
              if (ID == 11476 || ID == 11365 || ID == 11396) {
                return 1.5;
              } else {
                return 1;
              }
            },*/
        },
      },
    ],

    elements: fetch("collaboration.json")
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        //console.log(data["graph"]["elements"]);
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
