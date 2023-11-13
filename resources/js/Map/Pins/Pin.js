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
    map.on("load", () => {
        map.addSource("points", {
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
    });
};
