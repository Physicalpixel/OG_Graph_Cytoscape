document.addEventListener("DOMContentLoaded", function () {
  var startTime = performance.now();

  var cy = (window.cy = cytoscape({
    container: document.getElementById("cy"),
    //initilisation options
    hideEdgesOnViewport: true,

    layout: {
      name: "euler",
      randomize: true,
      animate: false,
    },

    style: [
      {
        selector: "node",
        style: {
          "background-color": function (ele) {
            if (ele._private["data"]["Community"] == 2) {
              return "#2ca02c";
            } else {
              return "white";
            }
          },
          width: function (ele) {
            if (ele._private["data"]["Community"] == 2 && ele.id() == 12846) {
              return 270; //blue
            } else if (ele._private["data"]["Community"] == 2) {
              return 170; //blue
            } else {
              return 20;
            }
          },

          height: function (ele) {
            if (ele._private["data"]["Community"] == 2 && ele.id() == 12846) {
              return 270; //blue
            } else if (ele._private["data"]["Community"] == 2) {
              return 170; //blue
            } else {
              return 20;
            }
          },

          ["label"]: function (ele) {
            return ele.id();
          },

          "font-size": function (ele) {
            if (ele._private["data"]["Community"] == 2) {
              return 40;
            } else {
              return 0;
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
          "text-outline-width": 6,
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
          "target-arrow-scale": 0,
          "curve-style": "bezier",
          "line-opacity": 0.7,
        },
      },
    ],

    elements: fetch("community.json")
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        return data["elements"];
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
