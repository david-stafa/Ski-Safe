import "./pin.scss";
import mapboxgl from "mapbox-gl";

export const newPin = (map) => {
    // pin data
    const geojson = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [-117.26, 52.19],
                },
                properties: {
                    title: "New Pin",
                    description: "Pin Head",
                },
            },
        ],
    };
    // after the map has loaded, add the source for the pins

    map.addSource("new", {
        type: "geojson",
        data: geojson,
    });
    for (const feature of geojson.features) {
        // create a HTML element for each feature
        const myPin = document.createElement("div");
        myPin.className = "myPin";

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(myPin)
            .setLngLat(feature.geometry.coordinates)
            .addTo(map);
    }
};
