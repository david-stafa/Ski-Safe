import mapboxgl from "mapbox-gl";
import { pinOnMap } from "../Pins/addPinOnMap";

export const popUp = (map) => {
    const myPopUp = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true,
    });

    map.on("click", "points", (e) => {
        // when we click points, create a pop up at the coordinates and use the description included in the geoJson.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const description = e.features[0].properties.description;
        const severity = e.features[0].properties.severity;
        const image = e.features[0].properties.image;

        myPopUp
            .setLngLat(coordinates)
            .setHTML(
                `<h3 style="color: #333; font-size: 16px;">${title}</h3>
                    <p style="color: #666; font-size: 14px;">${description}</p>
                    <p style="color: #f00; font-size: 14px;">
                        Severity: ${severity}
                    </p>
                    <img
                        src="${image}"
                        alt="${title}"
                        style="max-width: 100%; height: auto; margin-top: 10px;"
                    /> `
            )
            .addTo(map);
    });

    // syle the mouse as user enters points
    map.on("mouseenter", "points", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    // remove mouse style as user leaves
    map.on("mouseleave", "points", () => {
        map.getCanvas().style.cursor = "";
    });
};
