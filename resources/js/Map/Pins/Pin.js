export const Pin = () => {
    const geoJson = {
        type: "FeatureCollection",
        features: {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [-77.032, 38.913],
            },
            properties: {
                title: "Practice Pin",
                description: "Pin Head",
            },
        },
    };

    map.on("load", () => {
        map.addSource("points", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: [
                    {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [-117.2532, 52.1878],
                        },
                        properties: {
                            title: "Mapbox DC",
                        },
                    },
                ],
            },
        });
    });
};
