import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./map.scss";
import { mapBoxToken } from "./helpers/map-helper";
import { addPinLayer } from "./Pins/addPinLayer";

import { pinOnMap } from "./Pins/addPinOnMap/addPinOnMap";
import ShowPopUp from "./popUp/ShowPopUp";

mapboxgl.accessToken = mapBoxToken;

export default function Map() {
    const [mapState, setMapState] = useState(null);
    const mapContainer = useRef();

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
            // map.rotateTo(190, { duration: 3000 });
            // map.panTo(
            //     [-140.404811, 60.568208],
            //     { animation: true },
            //     { duration: 5000 }
            // );
            // map.flyTo({
            //     center: [-140.404811, 60.568208],
            //     zoom: 11.5,
            //     speed: 0.7,
            //     curve: 1,
            //     easing(t) {
            //         return t;
            //     },
            // });
            map.rotateTo(190, { duration: 5000 });

            //REMOVED FOR FGET PINS TESTING
            addPinLayer(map);
            setMapState(map);

            //DEVELOPMENTAL user can click and add a pin
            pinOnMap(map);
        });
    }, []);

    return (
        <>
            <div className="map" id="map" ref={mapContainer}></div>
            {mapState && <ShowPopUp map={mapState} />}
        </>
    );
}
