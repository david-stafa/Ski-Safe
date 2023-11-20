import mapboxgl from "mapbox-gl";
import "./addPinOnMap.scss";
import { MyFormModalContent } from "./MyFormModalContent";
import AddPinContent from "./AddPinContent";
import React, { useEffect, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import useToggle from "../../../components/Modal/use-toggle";

export default function AddPinOnMap({ map }) {
    const [isMyFormModalOpen, toggleIsMyFormModalOpen] = useToggle(false);
    const [coordinates, setCoordinates] = useState([]);
    let markerOnMap = false;

    const marker = new mapboxgl.Marker({
        color: "#314ccd",
    });

    //on click function
    const handleDblClick = useCallback(
        (e) => {
            const newCoordinates = [
                e.lngLat.lng.toFixed(6),
                e.lngLat.lat.toFixed(6),
            ];

            setCoordinates(newCoordinates);

            const placeHolder = document.createElement("div");
            placeHolder.className = "pop-up";
            const popUpRoot = createRoot(placeHolder);
            popUpRoot.render(
                <AddPinContent
                    isMyFormModalOpen={isMyFormModalOpen}
                    toggleIsMyFormModalOpen={toggleIsMyFormModalOpen}
                    coordinates={newCoordinates}
                />
            );

            const popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: true,
            })
                .setDOMContent(placeHolder)
                .setLngLat([e.lngLat.lng.toFixed(6), e.lngLat.lat.toFixed(6)])
                .addTo(map);

            setTimeout(() => {
                if (!markerOnMap) {
                    popup.addTo(map);
                }
            }, 500);

            // Enables to put pin one one click, on second click deletes it
            // if (markerOnMap) {
            //     marker.remove();
            //     markerOnMap = false;
        },
        [map, coordinates]
    );

    useEffect(() => {
        map.on("click");
    });

    useEffect(() => {
        map.on("dblclick", handleDblClick);
        console.log(coordinates);
        return () => {
            map.off("dblclick", handleDblClick);
        };
    }, [map, coordinates, handleDblClick]);

    return (
        <>
            {isMyFormModalOpen && (
                <MyFormModalContent
                    coordinates={coordinates}
                    marker={marker}
                    markerOnMap={markerOnMap}
                    map={map}
                />
            )}
        </>
    );
}
