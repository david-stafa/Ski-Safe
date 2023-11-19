import mapboxgl from "mapbox-gl";
import "./addPinOnMap.scss";
import { MyFormModalContent } from "./MyFormModalContent";
import UserContext from "../../../context/UserContext";
import React, { useContext, useEffect, useState } from "react";

// modal 1/4
// import React from "react";
import { createRoot } from "react-dom/client";
import Modal from "../../../components/Modal/Modal";

export const pinOnMap = (map) => {
    const { user, setUser } = useContext(UserContext);
    // modal 2/4
    const handleToggleModal = (content) => {
        const modalRoot = document.createElement("div");
        document.body.appendChild(modalRoot);

        const root = createRoot(modalRoot);

        const handleDismiss = () => {
            root.unmount();
            modalRoot.remove();
        };

        root.render(
            <Modal handleDismiss={handleDismiss} markerOnMap={markerOnMap}>
                {content}
            </Modal>
        );
    };

    let markerOnMap = false;
    //Look of the marker
    const marker = new mapboxgl.Marker({
        color: "#314ccd",
    });

    //on click function
    map.on("dblclick", (event) => { 
        if (user && user.role === "admin") {
            const popup = new mapboxgl.Popup().setHTML(
                `
                <div class="pop-up">
                    <h3>[${event.lngLat.lng.toFixed(
                        6
                    )}, ${event.lngLat.lat.toFixed(6)}]</h3>
                    <button id="create-form-button">Create a pin</button>
                </div>
            `
            );
        }

        // modal 4/4
        setTimeout(() => {
            document
                .getElementById("create-form-button")
                .addEventListener("click", () => {
                    handleToggleModal(
                        <MyFormModalContent
                            lng={event.lngLat.lng.toFixed(6)}
                            lat={event.lngLat.lat.toFixed(6)}
                            marker={marker}
                            markerOnMap={markerOnMap}
                            map={map}
                        />
                    );
                });
        }, 0);

        // Enables to put pin one one click, on second click deletes it
        if (markerOnMap) {
            marker.remove();
            markerOnMap = false;
        } else {
            marker
                .setLngLat([event.lngLat.lng, event.lngLat.lat])
                .setPopup(popup)
                .addTo(map)
                .togglePopup();
            markerOnMap = true;
        }
    });
};
