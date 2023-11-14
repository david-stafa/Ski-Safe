import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./map.scss";
import { mapBoxToken } from "./helpers/map-helper";
import { Pin } from "./Pins/Pin";
import { pinOnMap } from "./Pins/addPinOnMap";
// import { newPin } from "./Pins/newPin";
import { popUp } from "./popUp/popUp";

mapboxgl.accessToken = mapBoxToken;

export default function Map() {
    // const [coordinates, setCoordinates]=useState({
    //     longitude: null,
    //     latitude: null
    // })
    const mapContainer = useRef();

    useEffect(() => {
        // as the page mounts this renders our personalised map style (2D)
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/themainkane/clou0eblx00un01o46rwmb8f4",
            center: [-117.2532, 52.1878],
            zoom: 14,
            pitch: 60,
        });

        // ...this coverts the 2d style to a 3D 'model'

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

            // calling the pin function from Pin.js
            Pin(map);
            // newPin(map); Still glitchy, removed for now, in there as a back up option.

            //user can click and add a pin
            pinOnMap(map);
            popUp(map);
        });
        // *************end of useEffect**************
    }, []);

    return <div className="map" id="map" ref={mapContainer}></div>;
}
