// Create a map object
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
  
// Store our API endpoint inside queryUrl
//using all earthquakes in the last 7 days
var queryUrl ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

var earthquakes = []

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {

    //add function to format circle marker based on magnitude
    function styleMarker(feature){
        return {
            fillOpacity: 0.75,
            opacity: 0.75,
            color: "white",
            fillColor: colorMag(features.properties.mag),
            // Setting our circle's radius equal to the output of our markerSize function
            // This will make our marker's size proportionate to its population
            radius: radLength(features.properties.mag)
        }
    };
    //add function to calculate color based on magnitude
    function colorMag(magnitude){

    }
    //add function to calculate size based on magnitude
    function radLength(magnitude){
        if (magnitude===0){
            return 1;
        }
        return magnitude * 5;
    }

})


