import mapboxgl from "mapbox-gl";
import "./pop-up.scss";
import { DeletePin } from "../Pins/DeletePin";
import React, { useEffect, useState, useCallback, useContext } from "react";
import Modal from "../../components/Modal/Modal";
import useToggle from "../../components/Modal/use-toggle";
import PopUpContent from "./popUpContent";
import { createRoot } from "react-dom/client";
import { MyFormModalContent } from "../Pins/addPinOnMap/MyFormModalContent";
import UserContext from "../../context/UserContext";

export default function ShowPopUp({ map }) {
    const { user, setUser } = useContext(UserContext);
    const [isModalOpen, toggleIsModalOpen] = useToggle(false);
    const [isMyFormModalOpen, toggleIsMyFormModalOpen] = useToggle(false);
    const [details, setDetails] = useState({
        longitude: null,
        latitude: null,
        title: "",
        slug: "",
        severity: "",
        type_id: null,
        description: "",
        id: "",
        images: "",
    });
    const handleDeleteClick = () => {
        DeletePin(details.id);
    };
    const handleEditClick = () => {
        toggleIsModalOpen();
        toggleIsMyFormModalOpen();
    };
    const handleClick = useCallback(
        (e) => {
            const pinProperties = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();
            console.log(pinProperties);

            const newDetails = {
                ...details,
                longitude: coordinates[0],
                latitude: coordinates[1],
                title: pinProperties.title,
                slug: pinProperties.slug,
                severity: pinProperties.severity,
                severity_id: pinProperties.severity_id,
                type_id: pinProperties.type_id,
                description: pinProperties.description,
                id: pinProperties.id,
                images: pinProperties.images,
            };

            setDetails(newDetails);

            const placeHolder = document.createElement("div");
            placeHolder.className = "pop-up";
            const popUpRoot = createRoot(placeHolder);
            popUpRoot.render(
                <PopUpContent
                    isModalOpen={isModalOpen}
                    toggleIsModalOpen={toggleIsModalOpen}
                    details={newDetails}
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

    useEffect(() => {
        map.on("click", "lifts", handleClick);
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

    // syle the mouse as user enters points
    map.on("mouseenter", "lifts", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    // remove mouse style as user leaves
    map.on("mouseleave", "lifts", () => {
        map.getCanvas().style.cursor = "";
    });

    return (
        <>
            {isModalOpen && (
                <Modal handleDismiss={toggleIsModalOpen}>
                    <div className="mainBox">
                        <h3 className="mainBox-h3">Event: {details.title}</h3>

                        <p className="pop-up__severity">
                            <span className="severity-tite">Severity:</span>{" "}
                            <span>{details.severity}</span>
                        </p>
                        <h4>Basic Description:</h4>
                        <p>{details.slug}</p>
                        <p>{details.description}</p>
                        <img
                            className="image"
                            src={details.images}
                            alt="modalpin"
                        />

                        {user && user.role === "admin" && (
                            <>
                                <button
                                    id="delete-button-pins-modal"
                                    onClick={handleDeleteClick}
                                >
                                    Delete
                                </button>
                                <button
                                    id="edit-button-pins-modal"
                                    onClick={handleEditClick}
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                </Modal>
            )}
            {isMyFormModalOpen && (
                <MyFormModalContent
                    details={details}
                    toggleIsMyFormModalOpen={toggleIsMyFormModalOpen}
                />
            )}
        </>
    );
}
