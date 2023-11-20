import { getLifts } from "./getLifts";

export const addLiftLayer = async (map) => {
    try {
        const pinsData = await getLifts();
        const geojson = {
            type: "FeatureCollection",
            features: pinsData,
        };

        // check if there is a source points, if there is update the data, otherwise set the source to points (first load)
        map.getSource("lifts")
            ? map.getSource("lifts").setData(geojson)
            : map.addSource("lifts", {
                  type: "geojson",
                  data: geojson,
              });

        // It deletes the current layer before refresh - to prevend having duplicate layers
        if (map.getLayer("lifts")) {
            map.removeLayer("lifts");
        }

        map.addLayer({
            id: "lifts",
            type: "symbol",
            source: "lifts",
            layout: {
                "icon-image": "lift",
                "icon-size": 0.15,
            },
        });
    } catch (error) {
        console.error("Error fetching lifts", error);
    }
};
