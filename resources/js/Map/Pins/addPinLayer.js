import { getPins } from "./getPins";

export const addPinLayer = async (map) => {
    try {
        const pinsData = await getPins();
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

        map.addLayer({
            id: "points",
            type: "symbol",
            source: "points",
            layout: {
                "icon-image": "mountain",
                // get the title name from the source's "title" property
                // "text-field": ["get", "title"],
                // "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                // //style the pin further here, use mapbox studio to help generate the js
                // "text-offset": [0, 0.5],
                // "text-anchor": "top",
            },
        });
    } catch (error) {
        console.error("Error fetching pins", error);
    }

    // add a dependency to this useEffect once we start posting new pins
    // useEffect(() => {
    //     if (map) {
    //         updateMap();
    //     }
    // }, []); //add dependencies once we are succesfully posting pin-data so that new pins are rendered.
};
