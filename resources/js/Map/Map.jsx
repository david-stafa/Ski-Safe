import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./map.scss";
import { mapBoxToken } from "./helpers/map-helper";
import { addPinLayer } from "./Pins/addPinLayer";
import { pinOnMap } from "./Pins/addPinOnMap";
import { popUp } from "./popUp/popUp";
import { getPins } from "./Pins/getPins";

mapboxgl.accessToken = mapBoxToken;

export default function Map() {
    // const [coordinates, setCoordinates]=useState({
    //     longitude: null,
    //     latitude: null
    // })
    const mapContainer = useRef();
    // const [mapState, setMapState] = useState(null);

    useEffect(() => {
        // as the page mounts this renders our personalised map style (2D)
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/themainkane/clou0eblx00un01o46rwmb8f4",
            center: [-117.2532, 52.1878],
            zoom: 14,
            pitch: 60,
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
            // calling get pins test
            // getPins();

            //REMOVED FOR FGET PINS TESTING
            addPinLayer(map);
            // popUp(map);

            //DEVELOPMENTAL user can click and add a pin
            // pinOnMap(map);
        });
        // setMapState(map);
    }, []);

    return (
        <>
            <div className="map" id="map" ref={mapContainer}></div>
        </>
    );
}
