import mapboxgl from "mapbox-gl";
import "./pop-up.scss";
import { deletePin } from "../Pins/deletePin";

// modal 1/4
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import useToggle from "../../components/Modal/use-toggle";
import PopUpContent from "./popUpContent";
import { createRoot } from "react-dom/client";
import { ReactDOM } from "react-dom";

export default function ShowPopUp({ map }) {
    const [isModalOpen, toggleIsModalOpen] = useToggle(false);
    const [details, setDetails] = useState({
        longitude: null,
        latitude: null,
        title: "",
        slug: "",
        severity: "",
        description: "",
        id: "",
    });

    useEffect(() => {
        console.log(details);
    }, [details]);

    map.on("click", "points", (e) => {
        // when we click points, create a pop up at the coordinates and use the description included in the geoJson.

        const pinProperties = e.features[0].properties; //making variable access DRY
        const coordinates = e.features[0].geometry.coordinates.slice();
        const id = pinProperties.id;

        setDetails({
            title: pinProperties.title,
            slug: pinProperties.slug,
        });

        console.log(pinProperties);
        console.log(details);

        const placeHolder = document.createElement("div");
        placeHolder.className = "pop-up";
        const popUpRoot = createRoot(placeHolder);
        popUpRoot.render(
            <PopUpContent
                isModalOpen={isModalOpen}
                toggleIsModalOpen={toggleIsModalOpen}
                details={details}
            />
        );
        const myPopUp = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: true,
        })
            .setDOMContent(placeHolder)
            .setLngLat(coordinates)
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

    const renderButton = () => {
        return react.crea;
    };

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
