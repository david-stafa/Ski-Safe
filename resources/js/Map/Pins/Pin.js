export const Pin = (map) => {
    // pin data
    const geojson = {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    // coordinates [Longditude, Latitude]
                    coordinates: [-117.2532, 52.1878],
                },
                properties: {
                    title: "Animal Sighting",
                    severity: "Moderate",
                    description:
                        "A Brown bear was spotted, bears are recenlty out of hibernation and can be extremely Hangry, please keep your distance.",
                    image: "/images/Hazards/bear.jpg",
                },
            },
            {
                // davids new object including coordinates from click and other info input to form.
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
            "icon-image": "mountain",
            // get the title name from the source's "title" property
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.5],
            "text-anchor": "top",
        },
    });
};
