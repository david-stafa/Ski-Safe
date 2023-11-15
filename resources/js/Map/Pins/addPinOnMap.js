import mapboxgl from "mapbox-gl";

export const pinOnMap = (map) => {
    // Create constants for the latitude and longitude.

    let markerOnMap = false;

    //Look of the marker
    const marker = new mapboxgl.Marker({
        color: "#314ccd",
    });

    

    //on click function
    map.on("click", (event) => {
        // When the map is clicked, set the lng and lat constants
        // equal to the lng and lat properties in the returned lngLat object.

        const popup = new mapboxgl.Popup().setHTML(
            `
                <h2>${Math.round(event.lngLat.lng * 100) / 100}</h2>
                <h2>${Math.round(event.lngLat.lat * 100) / 100}</h2>
                <button>Create a pin</button>
            `
        );

        console.log(
            `${geojson.features[0].geometry.coordinates[0]}, ${geojson.features[0].geometry.coordinates[1]}`
        );
        
        if (markerOnMap) {  
            marker.remove()
            markerOnMap = false
        } else {
            marker
                .setLngLat(geojson.features[0].geometry.coordinates)
                .setPopup(popup)
                .addTo(map)
                .togglePopup();

            markerOnMap = true;
        }  

    });
};
