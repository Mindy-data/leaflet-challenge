// Create the tile layer that will be the background of our map.
let basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map with our layers.
let map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 2

});

// Add our "streetmap" tile layer to the map.
basemap.addTo(map);

let URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(URL).then((data) => {

    // function setPopupInfo(title) {
    //     // Pull the "title" from features.properties.title.
    //     let title = features.properties.title;

    //     // Initialize an array to hold the earthquake locations.
    //     let earthquakeMarkers = [];

    //     // Loop through the earthquake location array.
    //     for (let index = 0; index < title.length; index++) {
    //         let title = title[index];

    //         // For each earthquake, create a marker, and bind a popup with the earthquakes title information
    //         let earthquakeMarkers = L.marker([features.geometry[0], features.geometry[1]])
    //             .bindPopup(<div>features.properties.title</div>);

    //         // Add the marker to the earthquakemarker array.
    //         earthquakeMarkers.push(earthquakeMarkers);
    //     }
    // }

    function setRadius(mag) {
        if (mag == 0) {
            return 1;
        }
        return mag * 5
    }

    function setColor(depth) {
        switch (true) {
            case depth > 90:
                return "red";
            case depth > 70:
                return "OrangeRed";
            case depth > 50:
                return "OrangeYellow";
            case depth > 30:
                return "yellow";
            case depth > 10:
                return "LemonChiffon";
            default:
                return "green";
        }
    }

    function styleInfo(feature) {
        return {
            fillColor: setColor(feature.geometry.coordinates[2]),
            opacity: 1,
            color: "black",
            radius: setRadius(feature.properties.mag),
            weight: 0.3,
            fillOpacity: 1
        }
    }

    L.geoJson(data, {
        pointToLayer: function (feature, latlong) {
            return L.circleMarker(latlong);
        },
        style: styleInfo
    }).addTo(map);


});




