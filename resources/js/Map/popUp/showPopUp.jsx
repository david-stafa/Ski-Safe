// import React, { useContext, useEffect } from "react";
// import mapboxgl from "mapbox-gl";
// import ReactDOM from "react-dom";
// import { createRoot } from "react-dom/client";
// import Modal from "../../components/Modal/Modal";
// import UserContext from "../../context/UserContext";
// import { deletePin } from "../Pins/deletePin";
// import "./pop-up.scss";

// export default function showPopUp({ map }) {
//     const { user, setUser } = useContext(UserContext);

//     const role = user.role;
//     useEffect(() => {
//         if (!map) return;

//         const myPopUp = new mapboxgl.Popup({
//             closeButton: false,
//             closeOnClick: true,
//         });

//         const handleToggleModal = (content) => {
//             const modalRoot = document.createElement("div");
//             document.body.appendChild(modalRoot);

//             const root = createRoot(modalRoot);

//             const handleDismiss = () => {
//                 root.unmount();
//                 modalRoot.remove();
//             };

//             root.render(<Modal handleDismiss={handleDismiss}>{content}</Modal>);
//         };

//         const onClick = (e) => {
//             const pinProperties = e.features[0].properties;
//             const coordinates = e.features[0].geometry.coordinates.slice();
//             const { id, title, slug, severity, description } = pinProperties;

//             myPopUp
//                 .setLngLat(coordinates)
//                 .setHTML(
//                     `
//                 <div class="pop-up">
//                 <h3 class="pop-up__title">${title}</h3>
//                 <p class="pop-up__slug">${slug}</p>
//                        <p class="pop-up__severity">Severity: ${severity}</p>
//                        <button id="more-details-button">More Details</button>
//                        </div>
//                        `
//                 )
//                 .addTo(map);

//             setTimeout(() => {
//                 document
//                     .getElementById("more-details-button")
//                     .addEventListener("click", () => {
//                         handleToggleModal(
//                             <div>
//                                 <h2 style={{ color: "green" }}>
//                                     You have successfully displayed more
//                                     details!!!
//                                 </h2>
//                                 <h3>Event: {title}</h3>
//                                 <p className="pop-up__severity">
//                                     Severity: {severity}
//                                 </p>
//                                 <h4>Basic Description:</h4>
//                                 <p>{slug}</p>
//                                 <p>{description}</p>
//                                 <img
//                                     className="image"
//                                     src="/images/ModalPin/ModalPin.png"
//                                     alt="modalpin"
//                                 />
//                                 {role === "admin" && (
//                                     <button
//                                         id="delete-pin"
//                                         onClick={() => {
//                                             deletePin(id);
//                                         }}
//                                     >
//                                         Delete
//                                     </button>
//                                 )}
//                             </div>
//                         );
//                     });
//             }, 0);
//         };

//         map.on("click", "points", onClick);
//         map.on(
//             "mouseenter",
//             "points",
//             () => (map.getCanvas().style.cursor = "pointer")
//         );
//         map.on(
//             "mouseleave",
//             "points",
//             () => (map.getCanvas().style.cursor = "")
//         );

//         return () => {
//             map.off("click", "points", onClick);
//             map.off("mouseenter", "points");
//             map.off("mouseleave", "points");
//         };
//     }, [map]);

//     return null; // This component does not render anything itself
// }

import mapboxgl from "mapbox-gl";
import "./pop-up.scss";
import { getPins } from "../Pins/getPins";
import { pinOnMap } from "../Pins/addPinOnMap/addPinOnMap";
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
        images: "",
    });

    const handleClick = useCallback(
        (e) => {
            const pinProperties = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();
            console.log(pinProperties);

            const newDetails = {
                ...details,
                title: pinProperties.title,
                slug: pinProperties.slug,
                severity: pinProperties.severity,
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
                        <button
                        // id="delete-pin"
                        // onClick={() => {
                        //     deletePin(details.id);
                        // }}
                        >
                            Delete
                        </button>
                        <button>Edit</button>
                    </div>
                </Modal>
            )}
        </>
    );
}
