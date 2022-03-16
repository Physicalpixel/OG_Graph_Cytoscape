document.addEventListener("DOMContentLoaded", function () {
  var startTime = performance.now();

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
            var gate = ele._private["data"]["influencer_score"];
            if (gate < 0.021) {
              return 20;
            } else if (gate >= 0.021 && gate < 0.043) {
              return 200;
            } else if (gate >= 0.043) {
              return 300;
            }
          },

          height: function (ele) {
            var gate = ele._private["data"]["influencer_score"];
            if (gate < 0.021) {
              return 20;
            } else if (gate >= 0.021 && gate < 0.043) {
              return 200;
            } else if (gate >= 0.043) {
              return 300;
            }
          },

          ["label"]: function (ele) {
            return ele._private["data"]["first_name"];
          },

          "font-size": function (ele) {
            var gate = ele._private["data"]["influencer_score"];
            if (gate < 0.021) {
              return 0;
            } else if (gate >= 0.021) {
              return 60;
            }
          },
          "font-family": "Helvetica",
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
