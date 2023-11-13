import "./pin.scss";

export const Pin = (map) => {
    // pin data
    const geojson = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [-117.2532, 52.1878],
                },
                properties: {
                    title: "Practice Pin",
                    description: "Pin Head",
                },
            },
        ],
    };
    // after the map has loaded, add the source for the pins

    map.addSource("points", {
        type: "geojson",
        data: geojson,
    });
    map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
            "icon-image": "shop",
            // get the title name from the source's "title" property
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 1.25],
            "text-anchor": "top",
        },
    });
};

// for (const feature of geojson.features) {
//     // create a HTML element for each feature
//     const myPin = document.createElement("div");
//     myPin.className = "myPin";

//     // make a marker for each feature and add to the map
//     new mapboxgl.Marker(myPin)
//         .setLngLat(feature.geometry.coordinates)
//         .addTo(map);
// }
