import mapboxgl from "mapbox-gl";
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
                `<h3 style="color: #333; font-size: 16px;">${title}</h3>
                    <p style="color: #666; font-size: 14px;">${slug}</p>
                    <p style="color: #f00; font-size: 14px;">
                        Severity: ${severity}
                    </p>
                    <button id="pop-up__delete">Details</button
                    <button id="pop-up__delete" >Delete</button`
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
