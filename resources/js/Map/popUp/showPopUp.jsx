import mapboxgl from "mapbox-gl";
import "./pop-up.scss";
import { getPins } from "../Pins/getPins";
import { pinOnMap } from "../Pins/addPinOnMap/addPinOnMap";
import DeletePin from "../Pins/DeletePin";
import React, { useEffect, useState, useCallback } from "react";
import Modal from "../../components/Modal/Modal";
import useToggle from "../../components/Modal/use-toggle";
import PopUpContent from "./popUpContent";
import { createRoot } from "react-dom/client";
import { MyFormModalContent } from "../Pins/addPinOnMap/MyFormModalContent";

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
        images: "",
    });

    // const handleEditClick = () => {
    //     handleToggleModal(<MyFormModalContent details={details} />);
    // };

    const handleDeleteClick = () => {};

    const handleClick = useCallback(
        (e) => {
            const pinProperties = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();
            console.log(pinProperties);

            setDetails({
                title: pinProperties.title,
                slug: pinProperties.slug,
                severity: pinProperties.severity,
                description: pinProperties.description,
                id: pinProperties.id,
                images: pinProperties.images,
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
        console.log(details);
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
                        <h3>Event: {details.title}</h3>
                        <p className="pop-up__severity">
                            Severity: {details.severity}
                        </p>
                        <h4>Basic Description:</h4>
                        <p>{details.slug}</p>
                        <p>{details.description}</p>
                        <img
                            className="image"
                            src={details.images}
                            alt="modalpin"
                        />
                        <button onClick={handleDeleteClick}>Delete</button>
                        <button>Edit</button>
                    </div>
                </Modal>
            )}
        </>
    );
}
