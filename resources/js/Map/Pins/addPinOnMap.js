import mapboxgl from "mapbox-gl";

export const pinOnMap = (map) => {
    // Create constants for the latitude and longitude.

    let markerOnMap = false;

    let geojson = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [0, 0],
                },
                properties: {
                    title: "New Pin",
                    description: "Pin Head",
                },
            },
        ],
    };

    //Look of the marker
    const marker = new mapboxgl.Marker({
        color: "#314ccd",
    });

    //on click function
    map.on("click", (event) => {
        // When the map is clicked, set the lng and lat constants
        // equal to the lng and lat properties in the returned lngLat object.
        geojson.features[0].geometry.coordinates[0] = event.lngLat.lng;
        geojson.features[0].geometry.coordinates[1] = event.lngLat.lat;


        console.log(
            `${geojson.features[0].geometry.coordinates[0]}, ${geojson.features[0].geometry.coordinates[1]}`
        );
        
        if (markerOnMap) {  
            marker.remove()
            markerOnMap = false
        } else {
            marker
                .setLngLat(geojson.features[0].geometry.coordinates)
                .addTo(map);
            markerOnMap = true;
        }  

    });
};
