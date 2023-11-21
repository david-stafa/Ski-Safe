import { getHazards } from "./getHazards";

export const addHazardLayer = async (map) => {
    try {
        const pinsData = await getHazards();
        const geojson = {
            type: "FeatureCollection",
            features: pinsData,
        };

        // check if there is a source points, if there is update the data, otherwise set the source to points (first load)
        map.getSource("points")
            ? map.getSource("points").setData(geojson)
            : map.addSource("points", {
                  type: "geojson",
                  data: geojson,
              });

        if (map.getLayer("points")) {
            map.removeLayer("points");
        }

        map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
                "icon-image": "exclamation",
                "icon-size": 0.3,
            },
        });
    } catch (error) {
        console.error("Error fetching Hazards", error);
    }
};
