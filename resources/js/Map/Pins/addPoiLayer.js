import { getPois } from "./getPois";

export const addPoiLayer = async (map) => {
    try {
        const pinsData = await getPois();
        const geojson = {
            type: "FeatureCollection",
            features: pinsData,
        };

        // check if there is a source points, if there is update the data, otherwise set the source to points (first load)
        map.getSource("pois")
            ? map.getSource("pois").setData(geojson)
            : map.addSource("pois", {
                  type: "geojson",
                  data: geojson,
              });

        // It deletes the current layer before refresh - to prevend having duplicate layers
        if (map.getLayer("pois")) {
            map.removeLayer("pois");
        }

        map.addLayer({
            id: "pois",
            type: "symbol",
            source: "pois",
            layout: {
                "icon-image": "poi",
                "icon-size": 0.15,
            },
        });
    } catch (error) {
        console.error("Error fetching lifts", error);
    }
};
