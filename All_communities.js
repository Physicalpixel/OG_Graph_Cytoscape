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
            if (ele._private["data"]["Community"] == 0) {
              return "#1f77b4"; //blue
            } else if (ele._private["data"]["Community"] == 1) {
              return "#ff7f0e"; //orange
            } else if (ele._private["data"]["Community"] == 2) {
              return "#2ca02c"; //green
            } else if (ele._private["data"]["Community"] == 3) {
              return "#d62728"; //red
            } else if (ele._private["data"]["Community"] == 4) {
              return "#9467bd"; //violet
            } else if (ele._private["data"]["Community"] == 5) {
              return "#8c564b"; //brown
            } else if (ele._private["data"]["Community"] == 6) {
              return "#e377c2"; //pink
            } else if (ele._private["data"]["Community"] == 7) {
              return "#ffba01"; //dark yellow
            } else if (ele._private["data"]["Community"] == 8) {
              return "#bcbd22"; //lightgreen
            } else if (ele._private["data"]["Community"] == 9) {
              return "#bf3caf"; // deep pink
            } else if (ele._private["data"]["Community"] == 10) {
              return "#f4a582"; // peach
            } else if (ele._private["data"]["Community"] == 11) {
              return "#17becf"; //lightblue
            } else if (ele._private["data"]["Community"] == 12) {
              return "#fe4b83"; //flashy pink
            } else if (ele._private["data"]["Community"] == 13) {
              return "#52f667"; // floracent green
            } else if (ele._private["data"]["Community"] == 14) {
              return "#c2a5cf"; //lavender
            }
          },
          width: 45,

          height: 45,

          ["label"]: function (ele) {
            return ele.id();
          },

          "font-size": 0,
          "font-family": "Helvetica",
          //"border-width": 5,
          "border-color": "white",
          "border-style": "double",
          "border-opacity": 0.5,
          "text-halign": "center",
          "text-valign": "center",
          "text-outline-color": "white",
          "text-outline-opacity": 1,
          "text-outline-width": 15,
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

    elements: fetch("All_communities.json")
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
