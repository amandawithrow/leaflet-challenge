/* //add base layer map
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  }).addTo(myMap);
 */
// Store our API endpoint inside queryUrl
//using all earthquakes in the last 7 days
var queryUrl ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

/* var earthquakes = []
// Perform a GET request to the query URL
d3.json(queryUrl, function(data){
    earthquakes = data.features
    console.log(earthquakes);
});

 // Define a markerSize function that will give each city a different radius based on magnitude
function markerSize(magnitude) {
    return magnitude*140;
   */
 

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
  });
  
  function createFeatures(earthquakeData) {
  
    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature) {
        //first create array of markers
        for (var i = 0; i < feature.length; i++) {
            L.circle(feature[i].geometry, {
                    fillOpacity: 0.75,
                    color: "white",
                    fillColor: "purple",
                    // Setting our circle's radius equal to the output of our markerSize function
                    // This will make our marker's size proportionate to its population
                    radius: markerSize(feature[i].properties.mag)
                    }).bindPopup("<h3>" + feature[i].properties.title + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>").addTo(myMap);
                }
   
    }
  
    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });
  
    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
  }
  
  function createMap(earthquakes) {
  
    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
    });
  
    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Street Map": streetmap,
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  }
  




  