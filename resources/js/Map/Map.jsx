import { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "./map.scss";
import { mapBoxToken } from "./helpers/map-helper";
import { addHazardLayer } from "./Pins/addHazardLayer";
import ShowPopUp from "./popUp/showPopUp";
import Weather from "../components/homepage/weather/Weather";

import { addLiftLayer } from "./Pins/addLiftLayer";
import UserContext from "../context/UserContext";
import AddPinOnMap from "./Pins/addPinOnMap/addPinOnMap";
import { addPoiLayer } from "./Pins/addPoiLayer";

mapboxgl.accessToken = mapBoxToken;

export default function Map({ filterHazards, filterLifts, searchResults }) {
    const [mapState, setMapState] = useState(null);
    const mapContainer = useRef();
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        // as the page mounts this renders our personalised map style (2D)
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/themainkane/clou0eblx00un01o46rwmb8f4",
            center: [-140.404811, 60.568208],
            zoom: 11,
            pitch: 66,
        });

        map.on("load", () => {
            map.addLayer({
                id: "sky",
                type: "sky",
                paint: {
                    "sky-type": "atmosphere",
                    "sky-atmosphere-sun": [0.0, 90.0],
                    "sky-atmosphere-sun-intensity": 15,
                },
            });
            map.doubleClickZoom.disable();

            map.rotateTo(190, { duration: 5000 });
            addHazardLayer(map);
            addLiftLayer(map);
            addPoiLayer(map);

            // map.setLayoutProperty("lifts", "visibility", "visible");
            // map.setLayoutProperty("points", "visibility", "visible");
            setMapState(map);
        });
    }, [user]);

    // search below !!!!!!!!!!!!!!!!!!!!!!!!
    useEffect(() => {
        if (mapState) {
            clearMap(searchResults);
        }
    }, [searchResults, mapState]);

    // console.log("Map", searchResults); // data is here!!

    function clearMap(results) {
        if (!mapState) return;

        const layers = ["points", "lifts"]; // Add layers here!!!

        if (results.length > 0) {
            const resultIds = results.map((result) => result.id);

            layers.forEach((layerId) => {
                if (mapState.getLayer(layerId)) {
                    mapState.setFilter(layerId, [
                        "in",
                        ["get", "id"],
                        ["literal", resultIds],
                    ]);
                }
            });
        } else {
            layers.forEach((layerId) => {
                if (mapState.getLayer(layerId)) {
                    mapState.setFilter(layerId, null);
                }
            });
        }
    }
    // search above !!!!!!!!!!!!!!!!!!!

    // filters below
    const updateLayerVisibility = () => {
        const setLayerVisibility = (layerName, filterCondition) => {
            if (mapState && mapState.getLayer(layerName)) {
                mapState.setLayoutProperty(
                    layerName,
                    "visibility",
                    filterCondition ? "visible" : "none"
                );
            }
        };

        setLayerVisibility("points", filterHazards);
        setLayerVisibility("lifts", filterLifts);
    };

    useEffect(() => {
        updateLayerVisibility();
    }, [filterHazards, filterLifts, mapState]);
    // filters above

    return (
        <>
            <div className="map" id="map" ref={mapContainer}>
                <Weather />
            </div>
            {mapState && <ShowPopUp map={mapState} />}
            {mapState && <AddPinOnMap map={mapState} />}
        </>
    );
}
