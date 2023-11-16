import mapboxgl from "mapbox-gl";
import "./pop-up.scss";
import { getPins } from "../Pins/getPins";
import { pinOnMap } from "../Pins/addPinOnMap";

// modal 1/4
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Modal from "../../components/Modal/Modal";

// modal 2/4
const handleToggleModal = (content) => {
    const modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);

    const root = createRoot(modalRoot);

    const handleDismiss = () => {
        root.unmount();
        modalRoot.remove();
    };

    root.render(<Modal handleDismiss={handleDismiss}>{content}</Modal>);
};

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
        const description = e.features[0].properties.description;

        myPopUp
            .setLngLat(coordinates)
            .setHTML(
                `
                <div class="pop-up">
                   <h3 class="pop-up__title">${title}</h3>
                   <p class="pop-up__slug">${slug}</p>
                   <p class="pop-up__severity">Severity: ${severity}</p>
                   <button id="more-details-button">More Details</button>
                </div>
            `
            )
            .addTo(map);
        // modal 3/4 up - more-details-button

        // modal 4/4
        setTimeout(() => {
            document
                .getElementById("more-details-button")
                .addEventListener("click", () => {
                    handleToggleModal(
                        <div>
                            <h2 style={{ color: "green" }}>
                                You have successfully displayed more details!!!
                            </h2>
                            <h3>Event: {title}</h3>
                            <p className="pop-up__severity">
                                Severity: {severity}
                            </p>
                            <h4>Basic Description:</h4>
                            <p>{slug}</p>
                            <p>{description}</p>
                            <img
                                className="image"
                                src="/images/ModalPin/ModalPin.png"
                                alt="modalpin"
                            />
                        </div>
                    );
                });
        }, 0);
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
