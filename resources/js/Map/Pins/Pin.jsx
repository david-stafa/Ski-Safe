import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { getPins } from "./getPins";

export const Pin = ({ map }) => {
    // const isMounted = useRef(true); //ensuring that the async function is skipped if map is not rendered
    // add a dependency to this useEffect once we start posting new pins
    useEffect(() => {
        //pins is refered to as pinData below where we fetch the data.
        const updateMap = async () => {
            try {
                const pinsData = await getPins();
                const geojson = {
                    type: "FeatureCollection",
                    features: pinsData, //this is where our database data goes, structure is in getPins.js
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
                        "text-field": ["get", "title"],
                        "text-font": [
                            "Open Sans Semibold",
                            "Arial Unicode MS Bold",
                        ],
                        //style the pin further here, use mapbox studio to help generate the js
                        "text-offset": [0, 0.5],
                        "text-anchor": "top",
                    },
                });
            } catch (error) {
                console.error("Error fetching pins", error);
            }
        };
        updateMap();
    }, [map]); //add dependencies once we are succesfully posting pin-data so that new pins are rendered.

    return null;
};
