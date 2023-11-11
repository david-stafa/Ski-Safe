import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./map.scss";

mapboxgl.accessToken =
    "pk.eyJ1IjoidGhlbWFpbmthbmUiLCJhIjoiY2xvdHl0MXpoMGVnazJsbGwyYTV1cXgyYyJ9.Q1RCNY1cqjoBj_JnpEDhVQ";
export default function Map() {
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
            map.addSource("mapbox-dem", {
                type: "raster-dem",
                url: "mapbox://mapbox.mapbox-terrain-dem-v1",
                tileSize: 512,
                maxZoom: 100,
            });
            //   this adds a sky layer to the map
            map.setTerrain({ source: "mapbox-dem", exaggeration: 1 });
            map.addLayer({
                id: "sky",
                type: "sky",
                paint: {
                    "sky-type": "atmosphere",
                    "sky-atmosphere-sun": [0.0, 90.0],
                    "sky-atmosphere-sun-intensity": 15,
                },
            });
        });
        // *************end of useEffect**************
    }, []);

    return <div className="map" id="map" ref={mapContainer}></div>;
}
