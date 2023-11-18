import mapboxgl from "mapbox-gl";
import "./pop-up.scss";
import { getPins } from "../Pins/getPins";
import { pinOnMap } from "../Pins/addPinOnMap/addPinOnMap";
import { deletePin } from "../Pins/deletePin";

// modal 1/4
import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import Modal from "../../components/Modal/Modal";
import { MyFormModalContent } from "../Pins/addPinOnMap/MyFormModalContent";

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
        const pinProperties = e.features[0].properties; //making variable access DRY
        const coordinates = e.features[0].geometry.coordinates.slice();
        const id = pinProperties.id;
        const title = pinProperties.title;
        const slug = pinProperties.slug;
        const severity_id = pinProperties.severity_id;
        const description = pinProperties.description;
        const existingLng = coordinates[0];
        const existingLat = coordinates[1];

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
                            {console.log(id)}
                            <div className="buttons">
                                <button
                                    id="delete-pin"
                                    onClick={() => {
                                        deletePin(id);
                                    }}
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => {
                                        handleToggleModal(
                                            <MyFormModalContent
                                                id={id}
                                                title={title}
                                                slug={slug}
                                                severity_id={severity_id}
                                                description={description}
                                                existingLat={existingLat}
                                                existingLng={existingLng}
                                            />,
                                            console.log(id)
                                        );
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    );
                });
        });
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
