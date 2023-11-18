import mapboxgl from "mapbox-gl";
import "./pop-up.scss";
import { deletePin } from "../Pins/deletePin";
import React, { useEffect, useState, useCallback } from "react";
import Modal from "../../components/Modal/Modal";
import useToggle from "../../components/Modal/use-toggle";
import PopUpContent from "./popUpContent";
import { createRoot } from "react-dom/client";

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

    const handleClick = useCallback(
        (e) => {
            const pinProperties = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();
            const id = pinProperties.id;

            setDetails({
                title: pinProperties.title,
                slug: pinProperties.slug,
            });

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

            myPopUp.on("close", () => {
                if (myPopUp.isOpen()) {
                    myPopUp.remove();
                }
            });
        },
        [map, details]
    );

    useEffect(() => {
        map.on("click", "points", handleClick);

        return () => {
            map.off("click", "points", handleClick);
        };
    }, [map, details, handleClick]);

    // syle the mouse as user enters points
    map.on("mouseenter", "points", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    // remove mouse style as user leaves
    map.on("mouseleave", "points", () => {
        map.getCanvas().style.cursor = "";
    });

    return (
        <>
            {isModalOpen && (
                <Modal handleDismiss={toggleIsModalOpen}>
                    <div>
                        <h2 style={{ color: "green" }}>
                            You have successfully displayed more details!!!
                        </h2>
                    </div>
                </Modal>
            )}
        </>
    );
}

{
    /* <h3>Event: {title}</h3>
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
                    </div> */
}
