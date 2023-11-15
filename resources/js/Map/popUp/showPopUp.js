import mapboxgl from "mapbox-gl";
import "./pop-up.scss";
import { getPins } from "../Pins/getPins";
import { pinOnMap } from "../Pins/addPinOnMap";

export const ShowPopUp = async (map) => {
    // const pinData = await getPins();

    const myPopUp = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true,
    });

    map.on("click", "points", (e) => {
        // when we click points, create a pop up at the coordinates and use the description included in the geoJson.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;
        const slug = e.features[0].properties.slug;
        const severity = e.features[0].properties.severity;

        myPopUp
            .setLngLat(coordinates)
            .setHTML(
                `<div class="pop-up">
                   <h3 class="pop-up__title">${title}</h3>
                        <p class="pop-up__slug">${slug}</p>
                        <p class= "pop-up__severity">
                            Severity: ${severity}
                        </p>
                        <button>Details</button
                </div>`
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
