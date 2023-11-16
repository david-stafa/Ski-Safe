import mapboxgl from "mapbox-gl";
import "./pop-up.scss";
import { deletePin } from "../Pins/deletePin";

// modal 1/4
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import useToggle from "../../components/Modal/use-toggle";

// modal 2/4

export default function ShowPopUp({ map }) {
    const [isModalOpen, toggleIsModalOpen] = useToggle(false);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [severity, setSeverity] = useState("");
    const [description, setDescription] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        map.on("click", "points", (e) => {
            // when we click points, create a pop up at the coordinates and use the description included in the geoJson.
            const pinProperties = e.features[0].properties; //making variable access DRY
            const coordinates = e.features[0].geometry.coordinates.slice();
            const id = pinProperties.id;

            setTitle(pinProperties.title);
            setSlug(pinProperties.slug);
            setSeverity(pinProperties.severity);
            setDescription(pinProperties.description);
            setId(pinProperties.id);

            const myPopUp = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: true,
            })
                .setLngLat(coordinates)
                .setHTML(
                    `
           <h3 class="pop-up__title">${title}</h3>
           <p class="pop-up__slug">${slug}</p>
           <p class="pop-up__severity">Severity: ${severity}</p>
           <button id="more-details-button">More Details</button>
            `
                )
                .addTo(map);

            document
                .getElementById("more-details-button")
                .addEventListener("click", () => {
                    toggleIsModalOpen(!isModalOpen);
                    // map.getPopup().remove();
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
    }, [title, slug, severity]);

    return (
        <>
            {isModalOpen && (
                <Modal handleDismiss={toggleIsModalOpen}>
                    <div>
                        <h2 style={{ color: "green" }}>
                            You have successfully displayed more details!!!
                        </h2>
                    </div>
                    {/* <h3>Event: {title}</h3>
                        <p className="pop-up__severity">Severity: {severity}</p>
                        <h4>Basic Description:</h4>
                        <p>{slug}</p>
                        <p>{description}</p>
                        <img
                            className="image"
                            src="/images/ModalPin/ModalPin.png"
                            alt="modalpin"
                        />
                        {console.log(id)}
                        <button
                            id="delete-pin"
                            onClick={() => {
                                deletePin(id);
                            }}
                        >
                            Delete
                        </button>
                    </div> */}
                </Modal>
            )}
        </>
    );
}
