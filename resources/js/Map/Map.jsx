import { useRef, useEffect, useState, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "./map.scss";
import { mapBoxToken } from "./helpers/map-helper";
import ShowPopUp from "./popUp/showPopUp";
import Weather from "../components/homepage/weather/Weather";
import UserContext from "../context/UserContext";
import AddPinOnMap from "./Pins/addPinOnMap/addPinOnMap";
import loadLayers from "./Pins/addPinOnMap/loadLayers";

mapboxgl.accessToken = mapBoxToken;

export default function Map({ filterHazards, filterLifts }) {
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
            loadLayers(map);

            // map.setLayoutProperty("lifts", "visibility", "visible");
            // map.setLayoutProperty("points", "visibility", "visible");
            setMapState(map);
        });
    }, [user]);

    // filters below
    const updateLayerVisibility = () => {
        if (mapState) {
            if (mapState.getLayer("points")) {
                mapState.setLayoutProperty(
                    "points",
                    "visibility",
                    filterHazards ? "visible" : "none"
                );
            }
            if (mapState.getLayer("lifts")) {
                mapState.setLayoutProperty(
                    "lifts",
                    "visibility",
                    filterLifts ? "visible" : "none"
                );
            }
        }
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
